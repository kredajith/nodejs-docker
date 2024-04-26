const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'db', // This is the service name of the PostgreSQL container in Docker
  database: 'due-diligence-db',
  password: '123456',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello world!']);
    const { rows } = result;
    console.log("rows");
    res.send(rows[0].message);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.get('/home',async(req,res)=>{
    res.send("Hello Word welcome to Docker")
})

app.listen(8080, () => console.log('Server is running on port 8080'));
