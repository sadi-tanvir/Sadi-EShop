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
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://i.ibb.co/jgDtzL8/empty-avatar.jpg"
    }
}, { timestamps: true })




export default mongoose.models.User || mongoose.model('User', userSchema)