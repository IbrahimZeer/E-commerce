import express from 'express';
import { insertProduct } from '../controllers/controller_customer';

const route = express.Router();

route.post('/add_order', (req, res) => {
    insertProduct(req.body)
    res.status(200).send('order adding successfully');
})


route.put('/update_order', (req, res) => {
    console.log('update order route details')
    res.status(200).send('order updated successfully');
})


route.delete('/delete_order', (req, res) => {
    console.log('delete order route details')
    res.status(200).send('order deleted successfully');
});


route.get('/all_order', (req, res) => {
    console.log('list of orders')
    res.status(200).send('list of orders returned successfully');
})

export default route;