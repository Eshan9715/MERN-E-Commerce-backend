import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

export const payment = async(req,res)=>{
    const {tokenID, amount} = req.body
    stripe.charges.create({
        source: tokenID,
        amount: amount,
        currency: "usd" ,

    },(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        } else{
            res.status(200).json(stripeRes)

        }
    })
}