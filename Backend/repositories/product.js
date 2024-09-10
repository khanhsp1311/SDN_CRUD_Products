import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Brand from "../models/Brand.js"; // Make sure to import Brand model

// Get all Products with populated references
async function findAll(req, res) {
    try {
        // Build the query object based on request parameters
        const query = {};

        // Optional filtering based on query parameters
        if (req.query.stock) {
            query.stock = { $gte: parseInt(req.query.stock) };
        }
        if (req.query.price) {
            query.price = parseInt(req.query.price);
        }

        const products = await Product.find(query)
            .populate({ path: "brand", model: Brand }) // Populating the 'brand' field
            .populate({ path: "category", model: Category }) // Populating the 'category' field
            .exec();

        return products;
    } catch (error) {
        console.error("Error finding all products:", error);
        throw new Error(error.message);
    }
}

// Find a single Product by _id with populated references
async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
            .populate({ path: "brand", model: Brand }) // Populating the 'brand' field
            .populate({ path: "category", model: Category }) // Populating the 'category' field
            .exec();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return product;
    } catch (error) {
        console.error("Error finding product:", error);
        throw new Error(error.message);
    }
}

// Create a new Product
async function createOne(req, res, next) {
    try {
        // Generate new ID based on existing products
        const lastProduct = await Product.findOne().sort({ _id: -1 }).exec();
        console.log(req.body);

        const newProduct = await Product.create({ ...req.body });

        return newProduct;
    } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(error.message);
    }
}

// Delete a Product by _id
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        const result = await Product.deleteOne({ _id: id }).exec();

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return { message: "Product deleted successfully" };
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error(error.message);
    }
}

// Update a Product by _id
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true })
            .populate({ path: "brand", model: Brand }) // Populating the 'brand' field
            .populate({ path: "category", model: Category }) // Populating the 'category' field
            .exec();

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(error.message);
    }
}

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne
};
