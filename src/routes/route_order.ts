import express from 'express';
import { deleteOrder, getOrders, insertOrder, updateOrder } from '../controllers/controller_order.js';
import { OrderNS } from '../../@types/type_order.js';
import { Order } from '../db/entities/orders/Order.js';
import { authenticate } from '../middleware/authentication.js';

const route = express.Router();

route.post('/create_order', async (req, res) => {
    try {
        const payload: OrderNS.Order = req.body;
        const newOrder = await insertOrder(payload);
        res.status(201).json(newOrder);
    } catch {
        res.status(500).json({ error: 'Failed to create the order' });


    }
})

route.put('/update_order/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const order = await updateOrder(id, req.body);
        if (order) {
            res.status(201).send('Order Updated');
        } else {
            res.status(404).send('Order not found!');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the order' });
    }
});

route.delete('/delete_order/:id', async (req, res) => {
    deleteOrder(req.body)
    res.status(200).send('Order deleted successfully');


});

route.get('/all_order', (req, res, next) => {
    getOrders().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })

})


export default route;

