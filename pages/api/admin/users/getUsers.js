import User from "../../../../model/User"
import connectDB from "../../../../middleware/mongoConnect"
import jwt from "jsonwebtoken"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const { page, size } = req.query;

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email, role: 'admin' })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })

        // get users
        if (page && size) {
            const users = await User.find().skip(page * size).limit(size)
            if (!users) return res.status(400).json({ message: 'Failed to find users' });
            res.json({
                users
            });
        } else {
            const users = await User.find()
            if (!users) return res.status(400).json({ message: 'Failed to find users' });
            res.json({
                users
            });
        }


    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)