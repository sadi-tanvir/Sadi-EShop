import connectDB from "../../../middleware/mongoConnect"
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const handler = async (req, res) => {
    try {
        if (req.method !== 'POST') return res.status(400).json({ message: 'Method not allowed' });

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
        console.log(error);
        res.json({ error });
    }
}

export default connectDB(handler)