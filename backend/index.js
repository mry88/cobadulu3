const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./models/features");
require("./models/category");
require("./models/product");
require("./models/order");
const register = require("./routes/register");
const login = require("./routes/login");
const orders = require("./routes/orders");
const stripe = require("./routes/stripe");
const users = require("./routes/users");
const productsRoute = require("./routes/products");
const featuresRoute = require("./routes/features");
const categoryRoute = require("./routes/category");
const { Product } = require("./models/product");
const { Feature } = require("./models/features");
const { Category } = require("./models/category");
const { Order } = require("./models/order");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you're using cookies or sessions
    optionsSuccessStatus: 204,
  })
);

app.use(express.json({ limit: '50mb' }));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/orders", orders);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/features", featuresRoute);
app.use("/api/category", categoryRoute);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/features", async (req, res) => {
  const features = await Feature.find();
  res.send(features);
});

app.get("/category", async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
