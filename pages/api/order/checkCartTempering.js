import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"
import User from "../../../model/User";


const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });
        
        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        // check tempering
        for (let i = 0; i < req.body.cartProducts.length; i++) {
            const products = await Product.findOne({ _id: req.body.cartProducts[i].productId, price: req.body.cartProducts[i].price });
            if (!products) {
                return res.status(400).json({ tempering: true, message: 'the price of some items in your cart has changed, please! try again' });
            }
        }

        return res.status(200).json({ tempering: false, message: 'The product Price is not tempered' });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);