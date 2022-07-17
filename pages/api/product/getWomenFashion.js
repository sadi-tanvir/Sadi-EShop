import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const products = await Product.find({ category: "fashion/women" });

        let fashion = {}

        for (let product of products) {
            if (product.name in fashion) {
                if (!fashion[product.name].size.includes(product.size) && product.availableQty > 0) {
                    fashion[product.name].size.push(product.size)
                }
                if (!fashion[product.name].color.includes(product.color) && product.availableQty > 0) {
                    fashion[product.name].color.push(product.color)
                }
            } else {
                fashion[product.name] = JSON.parse(JSON.stringify(product))
                fashion[product.name].size = [product.size]
                fashion[product.name].color = [product.color]
            }
        }

        
        res.json({ fashion });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);