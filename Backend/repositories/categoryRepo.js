import Category from "../models/Category.js";

// Find all categories
const findAll = async () => {
    try {
        const categories = await Category.find({}).exec();
        return categories;
    } catch (error) {
        console.error("Error finding categories:", error);
        throw error;
    }
};

// Find a single category by ID
const findOne = async (id) => {
    try {
        const category = await Category.findById(id).exec();
        return category;
    } catch (error) {
        console.error("Error finding category:", error);
        throw error;
    }
};

// Create a new category
const createOne = async (categoryData) => {
    try {
        const items = await Category.find().sort({ id: -1 }).exec();
        const count = items.length ? items[0].id + 1 : 1;  // Increment or start at 1
        const newCategory = await Category.create({ id: count, ...categoryData });
        return newCategory;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Delete a category by ID
const deleteOne = async (id) => {
    try {
        const deletedCategory = await Category.deleteOne({ _id: id }).exec();
        return deletedCategory;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

// Update a category by ID
const updateOne = async (id, updateData) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedCategory;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne
};
