import Order from '../../../model/Order';
import Product from "../../../model/Product"
import User from "../../../model/User"
import connectDB from "../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });
        const { userEmail, products, phone, address, amount, payment_status, trxId, status, shipping } = req.body;

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })


        // update available quantity of products
        for (let product in products) {
            await Product.findOneAndUpdate(
                { _id: products[product]["productId"] },
                { $inc: { availableQty: - products[product]["qty"] } }
            )
        }

        // create new orders
        const newOrder = new Order({
            userEmail, products, phone, address, amount, payment_status, trxId, status, shipping
        })


        const order = await newOrder.save()
        if (!order) return res.status(400).json({ message: 'Failed to create order' });

        res.status(201).json({
            message: 'Order Has been placed successfully',
            order
        })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)