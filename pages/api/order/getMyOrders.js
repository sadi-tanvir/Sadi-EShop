import Order from '../../../model/Order';
import connectDB from "../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });
        
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(400).json({ message: 'Unauthorized User.' })

        const myOrders = await Order.find({ userEmail: decoded.email }).sort({ payment_status: -1 })

        res.status(201).json({
            message: 'Orders Has been Found successfully',
            myOrders
        })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)