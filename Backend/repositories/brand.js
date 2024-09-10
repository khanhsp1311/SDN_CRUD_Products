import Brand from "../models/Brand.js";

// Find all brands
const findAll = async () => {
    try {
        const brands = await Brand.find({}).exec();
        return brands;
    } catch (error) {
        console.error("Error finding brands:", error);
        throw error;
    }
};

// Find a single brand by ID
const findOne = async (id) => {
    try {
        const brand = await Brand.findById(id).exec();
        return brand;
    } catch (error) {
        console.error("Error finding brand:", error);
        throw error;
    }
};

// Create a new brand
const createOne = async (brandData) => {
    try {
        const items = await Brand.find().sort({ id: -1 }).exec();
        const count = items[0].id + 1;
        const idCount = { id: count };
        const newBrand = await Brand.create({ ...idCount, ...brandData });
        return newBrand;
    } catch (error) {
        console.error("Error creating brand:", error);
        throw error;
    }
};

// Delete a brand by ID
const deleteOne = async (id) => {
    try {
        const deletedBrand = await Brand.deleteOne({ _id: id }).exec();
        return deletedBrand;
    } catch (error) {
        console.error("Error deleting brand:", error);
        throw error;
    }
};

// Update a brand by ID
const updateOne = async (id, updateData) => {
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedBrand;
    } catch (error) {
        console.error("Error updating brand:", error);
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
