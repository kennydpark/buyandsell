require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const jsonMiddleware = express.json();
const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("email", "hashedPassword")
        select $1, $2
        where not exists (
          select $1 from "users" where "email" = $1
        )
        returning "userId", "email", "createdAt"
      `;
      const params = [email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      if (user) {
        res.status(201).json(user);
      } else {
        throw new ClientError(400, 'The email you entered is already in use.');
      }
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.post('/api/email', (req, res, next) => {
  const { to, from, subject, html } = req.body;
  if (!to) {
    throw new ClientError(400, 'Missing property: to');
  } else if (!from) {
    throw new ClientError(400, 'Missing property: from');
  } else if (!subject) {
    throw new ClientError(400, 'Missing property: subject');
  } else if (!html) {
    throw new ClientError(400, 'Missing property: html');
  }

  sgMail
    .send(req.body)
    .then(() => {
      res.status(201).json({
        status: 'success!'
      });
    })
    .catch(error => {
      console.error(error);
    });
});

app.get('/api/listings', (req, res, next) => {
  const sql = `
    select *
    from "listings"
    `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/listings/email/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    select "email"
    from "users"
    join "listings" using ("userId")
    where "listingId" = $1
  `;
  const params = [listingId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `Cannot find listing with listingId ${listingId}.`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/listings/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    select *
    from "listings"
    where "listingId" = $1
  `;
  const params = [listingId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `Cannot find listing with listingId ${listingId}.`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/listings', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { title, price, location, condition, description } = req.body;
  if (!req.file) {
    throw new ClientError(400, 'Missing property: image');
  } else if (!title) {
    throw new ClientError(400, 'Missing property: title');
  } else if (!price) {
    throw new ClientError(400, 'Missing property: price');
  } else if (!location) {
    throw new ClientError(400, 'Missing property: location');
  } else if (!condition) {
    throw new ClientError(400, 'Missing property: condition');
  } else if (!description) {
    throw new ClientError(400, 'Missing property: description');
  }
  const url = req.file.location;
  const sql = `
    insert into "listings"
    ("userId", "imageUrl", "title", "price", "location", "condition", "description")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;
    `;
  const values = [userId, url, title, price, location, condition, description];
  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/user/listings', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
    from "listings"
    where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/user/listings/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    select *
    from "listings"
    where "listingId" = $1
  `;
  const params = [listingId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `Cannot find listing with listingId ${listingId}.`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/user/listings/:listingId', (req, res, next) => {
  const listingId = Number(req.params.listingId);
  if (!Number.isInteger(listingId) || listingId <= 0) {
    throw new ClientError(400, '"listingId" must be a positive integer.');
  }
  const sql = `
    delete from "listings"
    where "listingId" = $1
    and "userId" = $2
    returning *;
    `;
  const values = [listingId, req.user.userId];
  db.query(sql, values)
    .then(result => {
      const listing = result.rows[0];
      if (!listing) {
        throw new ClientError(400, `Cannot find listing with listingId: ${listingId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.patch('/api/user/listings/:listingId', uploadsMiddleware, (req, res, next) => {
  const listingId = Number(req.params.listingId);
  const { title, price, condition, image, description } = req.body;
  if (!Number.isInteger(listingId) || listingId <= 0) {
    throw new ClientError(400, '"listingId" must be a positive integer.');
  }
  if (!title) {
    throw new ClientError(400, 'Missing property: title');
  } else if (!price) {
    throw new ClientError(400, 'Missing property: price');
  } else if (!condition) {
    throw new ClientError(400, 'Missing property: condition');
  } else if (!description) {
    throw new ClientError(400, 'Missing property: description');
  }
  let url;
  if (req.file) {
    url = req.file.location;
  } else {
    url = image;
  }
  const sql = `
    update "listings"
    set "imageUrl" = $3,
        "title" = $4,
        "price" = $5,
        "condition" = $6,
        "description" = $7
    where "listingId" = $1
      and "userId" = $2
    returning *;
    `;
  const values = [listingId, req.user.userId, url, title, price, condition, description];
  db.query(sql, values)
    .then(result => {
      const listing = result.rows[0];
      if (!listing) {
        throw new ClientError(400, `Cannot find listing with listingId: ${listingId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.post('/api/user/saved/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  const { userId } = req.user;
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    insert into "savedItems"
    ("listingId", "userId")
    values ($1, $2)
    returning *;
    `;
  const values = [listingId, userId];
  db.query(sql, values)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/user/saved', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "listings"
      join "savedItems" using ("listingId")
      where "savedItems"."userId" = $1
    `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/user/saved/listing/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  const { userId } = req.user;
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    select *
      from "listings"
      join "savedItems" using ("listingId")
      where "listings"."listingId" = $1
        and "savedItems"."userId" = $2
    `;
  const params = [listingId, userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(400, `Cannot find listing with listingId: ${listingId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/user/saved/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  const { userId } = req.user;
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    select *
      from "savedItems"
      where "listingId" = $1
      and "userId" = $2
    `;
  const params = [listingId, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/user/saved/:listingId', (req, res, next) => {
  const listingId = parseInt(req.params.listingId, 10);
  if (!listingId) {
    throw new ClientError(400, 'listingId must be a positive integer.');
  }
  const sql = `
    delete from "savedItems"
    where "listingId" = $1
    and "userId" = $2
    returning *;
    `;
  const values = [listingId, req.user.userId];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(400, `Cannot find listing with listingId: ${listingId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
