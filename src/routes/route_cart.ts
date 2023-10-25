import express from 'express';
import { addProductToCartController, updateCartController, deleteProductFromCartController } from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { Cart } from '../db/entities/Cart.js';
import { Product } from '../db/entities/Products/Product.js';
import { ExpressNS } from '../../@types/index.js';
import { authenticate } from '../middleware/authentication.js';


const route = express.Router();

route.post('/addProductToCart', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    try {
        const user = req.user;
        const cart = user?.cart;
        const productId = Number(req.body.id);
        const quantity = req.body.quantity;

        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }

        if (!quantity) {
            return res.status(400).send({ message: "Quantity is required" })
        }

        if (cart) {
            if (productId) {
                console.log(cart, req.body);
                await addProductToCartController(cart, product);
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

// update cart items , quantities total ...
route.put('/updateProductInCart', authenticate, async (req: ExpressNS.RequestWithUser, res) => {

    try {
        const user = req.user;
        const cart = user?.cart;
        const product = await Product.findOne({ where: { id: req.body.id } });
        if (!product) {
            return res.status(404).send({ message: "Product not found in cart" })
        }
        if (cart) {
            const updateCart = await updateCartController(cart, req.body);
            res.status(200).json({ message: "Cart updated", updateCart })
        }
    } catch (error) {
        throw new Error('Internal server error');
    }
})

// remove products from cart
route.delete('/removeProductFromCart/:productId', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
    try {
        const user = req.user;
        const cart = user?.cart;
        const productId = Number(req.params.productId);
        if (!productId) {
            return res.status(400).json({ message: "Product id is required" })
        }

        if (cart) {
            const deleteProduct = await deleteProductFromCartController(cart, productId);
            res.status(200).json({ message: "Product removed from cart", deleteProduct })
        }
    } catch (error) {
        throw new Error('Internal server error');
    }
})

// all cart items




export default route;