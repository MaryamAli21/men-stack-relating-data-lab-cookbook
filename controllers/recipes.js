const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find();
    res.render('recipes/index.ejs', {recipes});
});

router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.render('recipes/new.ejs', {ingredients});
});

router.post('/create', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id);
    try {
        req.body.owner = currentUser._id;
        await Recipe.create(req.body);
        res.redirect("/recipes");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    };
});

router.get('/:recipeId', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.render('recipes/show.ejs', {recipe});
});

router.delete('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect('/recipes');
});

router.get('/:recipeId/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.recipeId);
    const ingredients = await Ingredient.find();
    res.render('recipes/edit.ejs', {recipe, ingredients});
});

router.put('/:recipeId', async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect(`${req.params.recipeId}`);
});

module.exports = router;