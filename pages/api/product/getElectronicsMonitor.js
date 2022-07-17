import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const products = await Product.find({ category: "electronics/monitors" });

        let monitors = {}

        for (let product of products) {
            if (product.name in monitors) {
                if (!monitors[product.name].size.includes(product.size) && product.availableQty > 0) {
                    monitors[product.name].size.push(product.size)
                }
                if (!monitors[product.name].color.includes(product.color) && product.availableQty > 0) {
                    monitors[product.name].color.push(product.color)
                }
            } else {
                monitors[product.name] = JSON.parse(JSON.stringify(product))
                monitors[product.name].size = [product.size]
                monitors[product.name].color = [product.color]
            }
        }

        
        res.json({ monitors });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);