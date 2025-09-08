import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    const { name, slug, category, price, image } = req.body;
    if (!name || !slug || !price || !image)
        return res.status(400).json({ error: "Missing required fields" });

    try {
        const newProduct = new Product({ name, slug, category, price, image });
        await newProduct.save();
        res.json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
