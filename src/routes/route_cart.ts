import express from 'express';
import { insertCartController, addProductToCartController, updateCartController } from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { Cart } from '../db/entities/Cart.js';

const route = express.Router();

// add products in cart
route.post('/customer/addtocart', async (req, res) => {
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

route.post('/addProductToCart/:email', async (req, res) => {
    try {
        const customerEmail = req.params.email;
        const here = await Customer.findOne({ where: { email: customerEmail } })
        if (!here) {
            res.status(404).json({ message: "Customer not found" })
        }
        const cart = await Cart.findOne({ where: { id: req.body.id } });
        if (cart) {
            addProductToCartController(req.body)
            res.status(200).json({ message: "Product added to cart" })
        } else {
            updateCartController(req.body.id, req.body)
        }
    } catch (error) {
        throw new Error('Internal server error');
    }
})

// get users cart
// update cart items , quantities total ...
// remove products from cart
// all cart items




export default route;