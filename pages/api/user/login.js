import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';



const handler = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email })
        console.log(user.password);
        if (!user) return res.status(409).json({ message: 'User Not Exist.' })

        bcrypt.compare(password, user.password, (error, decoded) => {
            if (!decoded) return res.status(401).json({ message: 'Password doesn\'t match.' })

            res.status(200).json({
                message: "User Login successFully.",
                user,
                // token: generateToken(user.email)
            })
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)