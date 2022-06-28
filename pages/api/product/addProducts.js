import connectMongo from '../../../middleware/connectDB';
import Product from '../../../model/Product';


//  import('next').NextApiRequest
//  import('next').NextApiResponse

const addProduct = async (req, res) => {
    try {
        // connect mongodb
        await connectMongo();

        console.log(req.method)
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });


        const product = await Product.create(req.body);
        res.json({ product });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default addProduct