import mongoose, { ObjectId, Schema } from 'mongoose'



const Category = mongoose.model("Category", new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            // giá trị validator phải lớn hơn 3
            validator: value => value.length > 3,
            message: 'Length of name must be greater 3'
        }
    },
}))

export default Category
