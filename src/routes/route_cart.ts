import express from 'express';
import { insertCartController, addProductToCartController, updateCartController } from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { Cart } from '../db/entities/Cart.js';
import { Product } from '../db/entities/Products/Product.js';
import { ExpressNS } from '../../@types/index.js';
import { authenticate } from '../middleware/authentication.js';

const route = express.Router();

// add products in cart
route.post('/cart/:productId', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "you are unauthorized" })
        }
        const { quantity, price } = req.body;
        const productId = Number(req.params.productId);
        if (!productId || !quantity || !price) {
            console.log(req.body + 'from all is required')
            return res.status(400).json({ message: "missing some fields" })
        }
        req.body.totalPrice = quantity * price;
        await insertCartController(req.body, productId, user)
        res.status(200).json({ message: "Product added to cart" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

route.post('/addProductToCart/', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "you are unauthorized" })
        }
        const customerEmail = req.params.email;
        const productId = req.body.productId;
        const here = await Customer.findOne({ where: { email: customerEmail } })
        if (!here) {
            res.status(404).json({ message: "Customer not found" })
        }
        const cart = await Cart.findOne({ where: { id: req.body.id } });
        if (cart) {
            addProductToCartController(req.body, user)
            res.status(200).json({ message: "Product added to cart" })
        } else {
            updateCartController(req.body, user)
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