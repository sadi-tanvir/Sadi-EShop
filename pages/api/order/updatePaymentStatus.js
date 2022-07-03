import Order from '../../../model/Order';
import connectDB from "../../../middleware/mongoConnect"




const handler = async (req, res) => {
    try {
        if (req.method !== 'PATCH') return res.status(400).json({ message: 'Method not allowed' });
        const { id, trxId } = req.body;
        const order = await Order.findOne({ _id: id });
        console.log(id, trxId);

        if (!order) return res.status(400).json({ message: 'Failed to find order' });

        order.payment_status = true;
        order.trxId = trxId;
        await order.save();

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