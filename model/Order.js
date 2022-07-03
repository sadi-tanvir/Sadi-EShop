import mongoose from "mongoose"



const orderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    products: Object,
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    trxId: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending"
    },
    shipping: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



export default mongoose.models.Order || mongoose.model('Order', orderSchema)