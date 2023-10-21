import express from 'express';
import { insertCartController } from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';

const route = express.Router();

// add products in cart
route.post('customer/addtocart', async (req, res) => {
    const { customerName, productId, quantity, inOrder } = req.body;
    const custName = await Customer.findOne({ where: { userName: req.body.customerName } })
    if (!customerName || !productId || !quantity) {
        return res.status(400).json({ message: "Please fill all fields" })
    }

    if (custName) {
        insertCartController(customerName, productId, quantity, inOrder, req.body)
        res.status(200).json({ message: "Product added to cart" })
    }

})

// get users cart
// update cart items , quantities total ...
// remove products from cart
// all cart items




export default route;