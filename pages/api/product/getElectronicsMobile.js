import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });

        const products = await Product.find({ category: "electronics/mobiles" });

        let mobiles = {}

        for (let product of products) {
            if (product.name in mobiles) {
                if (!mobiles[product.name].size.includes(product.size) && product.availableQty > 0) {
                    mobiles[product.name].size.push(product.size)
                }
                if (!mobiles[product.name].color.includes(product.color) && product.availableQty > 0) {
                    mobiles[product.name].color.push(product.color)
                }
            } else {
                mobiles[product.name] = JSON.parse(JSON.stringify(product))
                mobiles[product.name].size = [product.size]
                mobiles[product.name].color = [product.color]
            }
        }

        
        res.json({ mobiles });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);