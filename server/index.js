require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
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

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.post('/api/email', (req, res, next) => {
  const { to, from, subject, text } = req.body;
  // const msg = {
  //   to: 'kennyparc@gmail.com', // Change to your recipient
  //   from: 'buyandsell0821@gmail.com', // Change to your verified sender
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  // };
  // const msg = JSON.parse(req.body);
  if (!to) {
    throw new ClientError(400, 'Missing property: to');
  } else if (!from) {
    throw new ClientError(400, 'Missing property: from');
  } else if (!subject) {
    throw new ClientError(400, 'Missing property: subject');
  } else if (!text) {
    throw new ClientError(400, 'Missing property: text');
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

app.post('/api/listings', uploadsMiddleware, (req, res, next) => {
  const { userId, title, price, location, condition, description } = req.body;
  if (!userId) {
    throw new ClientError(400, 'Missing property: userId');
  } else if (!req.file) {
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

  const url = `/images/${req.file.filename}`;
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

app.delete('/api/listings/:listingId', (req, res, next) => {
  const listingId = Number(req.params.listingId);
  if (!Number.isInteger(listingId) || listingId <= 0) {
    throw new ClientError(400, '"listingId" must be a positive integer.');
  }
  const sql = `
    delete from "listings"
    where "listingId" = $1
    returning *;
    `;
  const values = [listingId];
  db.query(sql, values)
    .then(result => {
      const listing = result.rows[0];
      if (!listing) {
        throw new ClientError(400, `Cannot find listing with "listingId." ${listingId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      throw new ClientError(500, 'An unexpected error occurred.');
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
