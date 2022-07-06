import mongoose from "mongoose"



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://i.ibb.co/jgDtzL8/empty-avatar.jpg"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    isPasswordChange: {
        type: String,
    }
}, { timestamps: true })




export default mongoose.models.User || mongoose.model('User', userSchema)