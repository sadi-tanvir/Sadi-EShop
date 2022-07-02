import Product from '../../../model/Product';
import connectDB from "../../../middleware/mongoConnect"



const handler = async (req, res) => {
    try {

        console.log(req.method)
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });
        const products = await Product.find({ category: "fashion/women" });

        let tshirts = {}

        for (let product of products) {
            if (product.name in tshirts) {
                if (!tshirts[product.name].size.includes(product.size) && product.availableQty > 0) {
                    tshirts[product.name].size.push(product.size)
                }
                if (!tshirts[product.name].color.includes(product.color) && product.availableQty > 0) {
                    tshirts[product.name].color.push(product.color)
                }
            } else {
                tshirts[product.name] = JSON.parse(JSON.stringify(product))
                tshirts[product.name].size = [product.size]
                tshirts[product.name].color = [product.color]
            }
        }

        
        res.json({ tshirts });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler);