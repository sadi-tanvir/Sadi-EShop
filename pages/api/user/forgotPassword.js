import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import jwt from "jsonwebtoken"
import SendEmail from "../../../middleware/sendEmail"

const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        const { email } = req.body;

        // find user
        const findUser = await User.findOne({ email })
        if (!findUser) return res.status(400).json({ message: 'No user account was created with this email' })

        // generate token
        const token = jwt.sign({ email: findUser.email }, process.env.SECRET_KEY, { expiresIn: '7d' })

        // send email
        SendEmail(findUser.name, findUser.email, token)

        findUser.isPasswordChange = token
        await findUser.save()

        res.status(200).json({
            success: true,
            message: 'Your request has been sent successfully.'
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)