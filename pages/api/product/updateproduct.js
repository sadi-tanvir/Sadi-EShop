import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {
        console.log(req.method)
        if (req.method !== 'PUT') return res.status(400).json({ message: 'Method not allowed' });

        
        const product = await Product.findOneAndUpdate(
            { _id: req.body._id },
            { $set: req.body },
            { new: true }
        );
        res.json({
            product
        });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);