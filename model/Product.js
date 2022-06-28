import mongoose from "mongoose"



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "pending"
    },
    availableQty: {
        type: Number,
        required: true
    },
    size: String,
    color: String

}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product;