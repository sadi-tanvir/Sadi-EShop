import Product from '../../../model/Product';
import User from "../../../model/User"
import connectDB from "../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        const product = await Product.create(req.body);
        res.json({ product });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)