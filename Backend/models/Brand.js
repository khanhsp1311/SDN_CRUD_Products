import mongoose, { ObjectId, Schema } from 'mongoose'



const Brand = mongoose.model("Brand", new Schema({
    id: {
        type: Number,
        required: true,
    },
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

export default Brand
