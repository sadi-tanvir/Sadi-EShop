import Order from '../../../../model/Order';
import User from "../../../../model/User"
import connectDB from "../../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'DELETE') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email, role: 'admin' })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        const deleteOrder = await Order.findOneAndDelete({ _id: req.query.id });
        if (!deleteOrder) return res.status(400).json({ message: 'Failed to delete order' });


        res.json({
            message: 'order deleted successfully',
        });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)