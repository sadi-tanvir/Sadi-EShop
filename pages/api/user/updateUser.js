import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


const handler = async (req, res) => {
    try {
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        const { name, email, phone, address, img } = req.body;

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        // update user data
        const temp = {
            name,
            email,
            phone,
            address,
            img
        }
        const user = await User.findOneAndUpdate({ email: decoded.email }, { $set: temp }, { new: true })

        res.status(200).json({
            message: "Information has been Updated successFully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                img: user.img
            }
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)