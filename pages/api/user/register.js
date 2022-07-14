import connectDB from "../../../middleware/mongoConnect"
import User from '../../../model/User';
import bcrypt from 'bcryptjs';
import registerValidator from "../../../middleware/validator"
import generateToken from "../../../middleware/generateToken"


const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        const { name, email, password, img } = req.body;

        // custom validator
        const validate = registerValidator({ name, email, password })
        if (!validate.isValid) return res.status(400).json(validate.error)

        // is user already exist
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(409).json({ message: 'User already exist.' })

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // create new user
        const newUser = await new User({
            name, email, password: hash, img
        })
        const user = await newUser.save()

        if (!user) return res.status(400).json({ message: 'failed to create The user.' })

        res.status(201).json({
            message: "User has been Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                img: user.img
            },
            token: generateToken(user.email, user.role)
        })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)