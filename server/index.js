require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const expressMiddleware = express.json();
const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);
app.use(expressMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/api/listings', (req, res, next) => {
  const { userId, imageUrl, title, price, location, condition, description } = req.body;
  const sql = `
    insert into "listings"
    ("userId", "imageUrl", "title", "price", "location", "condition", "description")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;
    `;
  const values = [userId, imageUrl, title, price, location, condition, description];
  if (!req.body.userId) {
    throw new ClientError(400, 'Missing property: userId');
  }
  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows);
    })
    // .catch(err => next(err));
    .catch(err => {
      console.error(err);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
