const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('connect', () => {
  pgClient
    .query(
      'CREATE TABLE IF NOT EXISTS todos (id INT, value VARCHAR(50), isdone BOOLEAN)'
    )
    .catch((err) => console.log(err));
});

// Express route handlers

app.get('/', (req, res) => {
  res.send('All fine...');
});

app.get('/todos', async (req, res) => {
  const values = await pgClient.query('SELECT * from todos');

  const sorted = values.rows.sort((first, second) => {
    return first.id - second.id;
  });

  res.send(sorted);
});

app.post('/todos', async (req, res) => {
  const { body } = req;

  await pgClient.query(
    `INSERT INTO todos (id, value, isdone) VALUES (${body.id}, '${body.value}', ${body.isdone})`
  );

  res.status(200).send();
});

app.patch('/todos', async (req, res) => {
  const { id } = req.query;
  const { body } = req;

  try {
    await pgClient.query(
      `UPDATE todos SET isdone = ${body.status} WHERE id = ${id}`
    );
    res.status(200).send();
  } catch {
    res.status(500).send();
  }
});

app.delete('/todos', async (req, res) => {
  const { id } = req.query;

  try {
    await pgClient.query(`DELETE FROM todos WHERE id = ${id}`);
    res.status(200).send();
  } catch {
    res.status(404).send();
  }
});

app.listen(5000, (err) => {
  console.log('Listening');
});
