const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
    console.log(req.body.title);

    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json(error);
    }
});

//GET specific product
router.get("/:productId", async (req, res) => {
    //res.send('Specific product ' + req.params.productId)
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

// Create new product
router.post("/", async (req, res) => {
    console.log(req.body.title);

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        category: req.body.category,
        img: req.body.img,
    });

    res.json(product);
    try {
        const savedProduct = product.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
});

// Update product
router.patch("/:productId", async (req, res) => {
    //console.log(req.body);
    //console.log(req.params.productId);

    try {
        const updateProduct = await Product.updateOne(
            { _id: req.params.productId },
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    stock: req.body.stock,
                    category: req.body.category,
                    img: req.body.img,
                },
            }
        );

        res.json(updateProduct);
    } catch (error) {
        res.json(error);
    }
});

// Delete product
router.delete("/:productId", async (req, res) => {
    console.log(req.params.productId);
    try {
        const deletedProduct = await Product.deleteOne({
            _id: req.params.productId,
        });
        res.json(deletedProduct);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
