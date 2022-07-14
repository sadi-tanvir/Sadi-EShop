import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';
import { loginValidator } from "../../../middleware/validator"
import generateToken from "../../../middleware/generateToken"


const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        const { email, password } = req.body;

        // custom validator
        const validate = loginValidator({ email, password })
        if (!validate.isValid) return res.status(400).json(validate.error)

        // find user
        const user = await User.findOne({ email })
        if (!user) return res.status(409).json({ message: 'User Not Exist.' })

        // matching password
        bcrypt.compare(password, user.password, (error, decoded) => {
            if (!decoded) return res.status(401).json({ message: 'Password doesn\'t match.' })

            res.status(200).json({
                message: "User Login successFully.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    img: user.img
                },
                token: generateToken(user.email, user.role)
            })
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)