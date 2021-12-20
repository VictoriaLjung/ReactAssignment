const express = require("express");
const router = express.Router();
const Category = require("../models/Categories");

// GET all categories
router.get("/", async (req, res) => {
    console.log(req.body.title);

    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.json(error);
    }
});

//GET specific categories
router.get("/:categoryId", async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

// Create new Category
router.post("/", async (req, res) => {
    console.log(req.body.title);

    const category = new Category({
        title: req.body.title,
    });

    res.json(category);
    try {
        const savedCategory = category.save();
        res.json(savedCategory);
    } catch (error) {
        res.json(error);
    }
});

// Update Category
router.patch("/:categoryId", async (req, res) => {
    try {
        const updateCategory = await Category.updateOne(
            { _id: req.params.categoryId },
            {
                $set: {
                    title: req.body.title,
                },
            }
        );

        res.json(updateCategory);
    } catch (error) {
        res.json(error);
    }
});

// Delete Category
router.delete("/:categoryId", async (req, res) => {
    console.log(req.params.categoryId);
    try {
        const deletedCategory = await Category.deleteOne({
            _id: req.params.categoryId,
        });
        res.json(deletedCategory);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;