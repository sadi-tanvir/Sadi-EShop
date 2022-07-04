import connectDB from "../../../middleware/mongoConnect"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import jwt from "jsonwebtoken"
import User from "../../../model/User"



const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

        // check authentication
        const decoded = jwt.verify(req.headers.authentication, process.env.SECRET_KEY)
        if (!decoded) return res.status(403).json({ message: 'Forbidden User.' })
        const findUser = await User.findOne({ email: decoded.email })
        if (!findUser) return res.status(401).json({ message: 'Unauthorized User.' })
        

        const calculateOrderAmount = (price) => {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            const amount = price * 100
            return amount;
        };


        const { price } = req.query;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(price),
            currency: "usd",
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        res.json({ error });
    }
}

export default connectDB(handler)