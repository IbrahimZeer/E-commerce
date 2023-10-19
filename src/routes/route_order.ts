import express from 'express';
import { deleteOrder, getOrders, insertOrder } from '../controllers/controller_order.js';
import { OrderNS } from '../../@types/type_order.js';
import { Order } from '../db/entities/orders/Order.js';
import { authenticate } from '../middleware/authentication.js';
import { getManager } from 'typeorm';

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


route.put('/update_order:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const order = await Order.findOneBy({ id })
        if (order) {

            order.orderAddress = order.orderAddress;
            order.productPrice = order.productPrice;
            order.deliveryCost = order.deliveryCost;
            order.discount = order.discount;
            order.totalPrice = order.totalPrice;
            order.orderDate = order.orderDate;
            await order.save();
            res.status(201).send('Order Updated');

        } else {
            res.status(404).send('Order not found!');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the order' });
    }
    // const id = req.params.id;
    // const task = await Todo.findOneBy({ id });
    // if (task) {
    //   // task.title = req.body.title;
    //   // task.description = req.body.description;
    //   task.status = 'done';
    //   task.save();
    //   res.send('Task Updated');
    // } else {
    //   res.status(404).send('Task not found!');
    // }


});



route.delete('/delete_order/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await deleteOrder(orderId);

        res.status(200).send('Order deleted successfully');
    } catch (error) {
        res.status(500).send('An error occurred while deleting the order');
    }
});


route.get('/all_order', (req, res, next) => {
    getOrders().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })

})


export default route;

