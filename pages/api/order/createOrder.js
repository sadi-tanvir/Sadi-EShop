import Order from '../../../model/Order';
import connectDB from "../../../middleware/mongoConnect"




const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });
        const { userEmail, products,phone, address, amount, payment_status, trxId, status, shipping } = req.body;
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