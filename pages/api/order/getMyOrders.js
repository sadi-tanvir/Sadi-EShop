import Order from '../../../model/Order';
import connectDB from "../../../middleware/mongoConnect"




const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });
        const myOrders = await Order.find({ userEmail: req.query.email })

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