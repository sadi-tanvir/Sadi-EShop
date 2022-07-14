import Order from '../../../../model/Order';
import User from "../../../../model/User"
import connectDB from "../../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email, role: 'admin' })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        const order = await Order.findOneAndUpdate({ _id: req.body._id }, {$set:{payment_status: true}}, { new: true });
        if (!order) return res.status(400).json({ message: 'Failed to update payment status' });


        res.json({
            message: 'payment confirmed successfully',
        });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)