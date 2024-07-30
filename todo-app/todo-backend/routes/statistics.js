const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

/* GET Statistics */
router.get('/', async (req, res) => {
  const addedTodos = await getAsync('added_todos') || 0;
  res.json({ added_todos: parseInt(addedTodos) });
});

module.exports = router;
