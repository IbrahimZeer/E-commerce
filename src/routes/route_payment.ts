import express from 'express';
import coinbase from 'coinbase-commerce-node';
import { authenticate } from '../middleware/authentication.js';
import { ExpressNS } from '../../@types/index.js';
const route = express.Router();


const Client = coinbase.Client;
const resources = coinbase.resources;
const coinbaseAPIKey = process.env.COINBASE_API_KEY || '';
Client.init(coinbaseAPIKey);
route.post('/checkout', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    const { amount, currency } = req.body;
    const id = req.user?.id;
    const userName = req.user?.userName;
    const cart = req.user?.cart;
    const charge = await resources.Charge.create({
        name: 'Charge',
        description: 'charge description',
        local_price: {
            amount: amount,
            currency: "USD",
        },
        pricing_type: "fixed_price",
        metadata: {
            customer_id: id,
            customer_name: userName,
            cart_id: cart,
        },
    })

    res.status(200).json(charge);
})


route.put('/update_payment', (req, res) => {
    console.log('update payment route details')
    res.status(200).send('payment updated successfully');
})


route.delete('/delete_payment', (req, res) => {
    console.log('delet payment route details')
    res.status(200).send('payment deleted successfully');
});


route.get('/all_payment', (req, res) => {
    console.log('list of payments')
    res.status(200).send('list of payments returned successfully');
})

// user payment history
// payment details

export default route;