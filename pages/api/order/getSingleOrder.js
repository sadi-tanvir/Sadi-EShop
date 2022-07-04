import Order from '../../../model/Order';
import User from "../../../model/User"
import connectDB from "../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        // find order by id
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