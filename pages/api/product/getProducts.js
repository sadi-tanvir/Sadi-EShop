import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {

        console.log(req.method)
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });


        const products = await Product.find({});
        res.json({ products });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);