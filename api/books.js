const express = require('express');
const router = express.Router();
const pool = require('../db');

// const result = "SELECT * FROM something";
// const query = await pool.query(result);
// return res.json(query.rows[0]);

router.get('/', async (req, res) => {
    const result = "SELECT * FROM books";
    const query = await pool.query(result);
    return res.json(query.rows);
});

router.get('/:id', async (req, res) => {
    const {id} = req.body;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    const query = await pool.query(result);
    return res.json(query.rows[0]);
});

router.post('/', async (req, res) => {
     const { title, author, year } = req.body;

    const query = 'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, author, year];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const values = [id];

    const result = await pool.query(query, values);
    res.json(result.rows[0]); 
});

module.exports = router