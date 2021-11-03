require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
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

app.post('/api/listings', (req, res, next) => {
  const { userId, imageUrl, title, price, location, condition, description } = req.body;
  if (!userId) {
    throw new ClientError(400, 'Missing property: userId');
  } else if (!imageUrl) {
    throw new ClientError(400, 'Missing property: imageUrl');
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
  const sql = `
    insert into "listings"
    ("userId", "imageUrl", "title", "price", "location", "condition", "description")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *;
    `;
  const values = [userId, imageUrl, title, price, location, condition, description];
  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
