import mongoose from "mongoose"

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jnizw.mongodb.net/${process.env.MONGO_USER}?retryWrites=true&w=majority`;
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }

    mongoose.connect(MONGO_URI)
    return handler(req, res)
}

export default connectDB