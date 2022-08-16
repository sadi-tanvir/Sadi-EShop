import Order from '../../../../model/Order';
import User from "../../../../model/User"
import connectDB from "../../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"


const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const { page, size, search } = req.query;

        // Orders searching query
        const query = search ?
            {
                $or: [
                    { userEmail: { $regex: search, $options: "i" } },
                    { phone: { $regex: search, $options: "i" } },
                    { trxId: { $regex: search, $options: "i" } },
                ]
            }
            : {}

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email, role: 'admin' })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        if (page && size) {
            const orders = await Order.find(query).sort({ payment_status: 1, shipping: 1 }).skip(page * size).limit(size)
            if (!orders) return res.status(400).json({ message: 'Failed to find orders' });
            res.json({
                orders
            });
        } else {
            const orders = await Order.find()
            if (!orders) return res.status(400).json({ message: 'Failed to find orders' });
            res.json({
                orders
            });
        }

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)