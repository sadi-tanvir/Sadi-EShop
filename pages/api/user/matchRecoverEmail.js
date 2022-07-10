import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';

const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const { token, email } = req.query;

        // // find user
        const findUser = await User.findOne({ email, isPasswordChange: token })
        if (!findUser) return res.status(400).json({ message: 'Token Not Match' })

        findUser.isPasswordChange = 'token matched'
        await findUser.save()

        res.send(`<a style="background-color: #34d399; padding: 10px 20px; color: #fff; text-decoration: none ; display:inline-block; margin-top: 200px; margin-left: 450px; cursor: pointer" href="http://localhost:3000/forgot?email=${findUser.email}">Click Here to Reset Password</a>`)

    } catch (error) {
        res.status(500).json(error)
    }
}

export default connectDB(handler)