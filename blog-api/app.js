const express = require("express");
const app = express(); 
const mongoose = require("mongoose"); 

const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(bodyParser.json()); // Format all incoming data to JSON
app.use(cors()); // Allow cross-origin requests

// ROUTES
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/category");
app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);

app.get("/", (req, res) => {
    res.send("Home page");
});

// DB connections
// mongodb+srv://<username>:<password>@cluster0.wffly.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    "mongodb+srv://vicci:vicci@cluster0.gfhqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("DB connected");
    }
);

// Start listening to the server.
app.listen(5000); // the to requests through port 5000
