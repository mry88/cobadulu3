const { Feature } = require("../models/features");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");

const router = require("express").Router();

//GET FEATURE
router.get("/", async (req, res) => {
  const fn = req.query.name;
  try {
    let features;

    if (fn) {
      features = await Feature.find({
        name: fn,
      }).sort({ _id: -1 });
    } else {
      features = await Feature.find().sort({ _id: -1 });
    }

    res.status(200).send(features);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CREATE FEATURE
router.post("/", async (req, res) => {
  try {
    // Extract the data for the new feature item from the request body
    const { name, description, price } = req.body;

    // Create a new feature instance
    const feature = new Feature({
      name,
      description,
      price,
    });

    // Save the feature to the database
    const savedFeature = await feature.save();

    // Respond with the saved feature
    res.status(201).json(savedFeature);
  } catch (error) {
    console.error("Error creating feature:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//EDIT FEATURE
router.put("/:id", async (req, res) => {
  const featuresId = req.params.id;

  const productsWithFeatures = await Product.find({ features: featuresId });

  if (productsWithFeatures.length > 0) {
    return res.status(400).json({ error: "Features is referenced in products" });
  }
  
  try {
      const updatedFeature = await Feature.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.features
        },
        { new: true }
        );
      res.status(200).json(updatedFeature);
  } catch (error) {
      console.error("Error updating feature:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

//DELETE FEATURE
router.delete("/:id", async (req, res) => {
  const featuresId = req.params.id;

  const productsWithFeatures = await Product.find({ features: featuresId });

  if (productsWithFeatures.length > 0) {
    return res.status(400).json({ error: "Features is referenced in products" });
  }
  
  try {
    const deleteFeature = await Feature.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteFeature);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET FEATURE NAMES BY IDS
router.post("/names", async (req, res) => {
  try {
    // Extract the array of feature IDs from the request body
    const featureIds = req.body.featureIds;

    // Find features by their IDs and select only the 'name' field
    const featureNames = await Feature.find(
      { _id: { $in: featureIds } },
      "name"
    );

    // Extract the names from the result
    const names = featureNames.map((feature) => feature.name);

    // Respond with the feature names
    res.status(200).json(names);
  } catch (error) {
    console.error("Error fetching feature names:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;