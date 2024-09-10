import mongoose, { ObjectId, Schema } from "mongoose"

const Product = mongoose.model("Product", new Schema({

    title: {
        type: String,
        required: true,
        validate: {
            // giá trị validator phải lớn hơn 3
            validator: value => value.length > 3,
            message: 'Length of name must be greater 3'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: value => value.length > 5,
            message: 'Length of description must be greator 5'
        }
    },
    price: {
        type: Number,
        validate: {
            validator: value => value > 0,
            message: 'Length of price must be > 0'
        }
    },
    discount: {
        type: Number,
        validate: {
            validator: value => value > 0,
            message: 'Length of price must be > 0'
        }
    },
    // product: { type: mongoose.Types.ObjectId, ref: "Product" }
    brand: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Brand"
    },
    thumbnail: String,
    category: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Category"
    }

}, {
    timestamps: true
}))

export default Product
