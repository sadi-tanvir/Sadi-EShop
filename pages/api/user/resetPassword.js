import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


const handler = async (req, res) => {
    try {
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        const { email, newPassword, confirmPassword } = req.body;

        // find user
        const findUser = await User.findOne({ email })
        if (!findUser) return res.status(400).json({ message: 'No user account was created with this email' })


        if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Password and Confirm Password not match' })

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        // update password
        const updatePassword = await User.findOneAndUpdate({ email: findUser.email, isPasswordChange: 'token matched' }, { password: hash, isPasswordChange: 'password changed' })
        if (!updatePassword) return res.status(401).json({ message: 'Failed to update password.' })

        res.status(200).json({ success: true, message: 'Password Reset successfully.' })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)