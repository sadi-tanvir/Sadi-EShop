import { Schema, model } from "mongoose"



const userSchema = new Schema({
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

const User = model('User', userSchema)

export default User;