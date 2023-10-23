import express from 'express';
import { addProductToCartController, updateCartController } from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { Cart } from '../db/entities/Cart.js';
import { Product } from '../db/entities/Products/Product.js';
import { ExpressNS } from '../../@types/index.js';
import { authenticate } from '../middleware/authentication.js';

const route = express.Router();

// add products in cart
route.post('/:productId', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
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
        res.status(200).json({ message: "Product added to cart from add to product" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

route.post('/addProductToCart/:id', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ message: "you are unauthorized" })
        }
        const cart = await Cart.findOne({ where: { id: req.body.id } });
        const productId = Number(req.params.id);
        if (cart) {
            if (productId) {
                addProductToCartController(req.body, productId, user)
                res.status(200).json({ message: "Product added to cart" })
            } else {
                res.status(400).json({ message: "product not found" })
            }
        } else {
            res.status(404).json({ message: "something went wrong" })
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