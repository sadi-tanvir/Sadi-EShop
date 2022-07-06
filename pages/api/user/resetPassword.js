import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"


const handler = async (req, res) => {
    try {
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        const { oldPassword, newPassword } = req.body;

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        // check old password
        const isMatchPassword = await bcrypt.compare(oldPassword, findUser.password)
        if (!isMatchPassword) return res.status(400).json({ message: 'Password doesn\'t match.' })

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        // update password
        const updateUser = await User.findOneAndUpdate({ email: decoded.email }, { password: hash })
        if (!updateUser) return res.status(401).json({ message: 'Failed to update password.' })

        res.status(200).json({ success: true, message: 'Password updated successfully.' })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)