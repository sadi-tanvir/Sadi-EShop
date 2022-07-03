import Order from '../../../model/Order';
import connectDB from "../../../middleware/mongoConnect"




const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });
        const order = await Order.findOne({ _id: req.query.id })

        res.status(201).json({
            message: 'Order Has been Found successfully',
            order
        })

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)