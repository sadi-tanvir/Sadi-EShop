import Product from '../../../model/Product';
import User from "../../../model/User"
import jwt from "jsonwebtoken"
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {
        console.log(req.method)
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })
        
        // update product
        const product = await Product.findOneAndUpdate(
            { _id: req.body._id },
            { $set: req.body },
            { new: true }
        );
        res.json({
            product
        });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);