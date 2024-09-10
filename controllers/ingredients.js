const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

router.get('/recipes/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();  
    res.render('recipes/new', { ingredients });   
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;