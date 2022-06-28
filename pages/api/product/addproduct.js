import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"




const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        const product = await Product.create(req.body);
        res.json({ product });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)