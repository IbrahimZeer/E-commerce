import express from 'express';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import { ProductNS } from '../../@types/type_product.js';
import { Product } from '../db/entities/Products/Product.js';



const insertCart = async (payload: CartNs.Cart) => {
    try {
        const newCart = new Cart();
        newCart.quantity = payload.quantity;
        newCart.isPuecashed = payload.isPuecashed;

        await newCart.save();
        return newCart;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}



// const addToCart = async (req: Request, res: Response) => {
//     try {
//         const userId = req.user.id; // Assuming you have user authentication middleware
//         const productId = req.body.productId; // Get the product ID from the request body

//         // Check if the product exists
//         const product = await Product.findOne(productId);

//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         // Check if the user already has a cart
//         let cart = await Cart.findOne({ where: { customer: userId } });

//         if (!cart) {
//             // If the user doesn't have a cart, create a new one
//             cart = Cart.create({
//                 customer: userId,
//                 quantity: 1,
//                 product: product,
//             });

//             await cart.save();
//         } else {
//             // If the user already has a cart, check if the product is already in the cart
//             if (cart.product && cart.product.id === productId) {
//                 // If the product is in the cart, increase its quantity
//                 cart.quantity += 1;
//             } else {
//                 // If the product is not in the cart, add it as a new cart item
//                 cart.product = product;
//                 cart.quantity = 1;
//             }

//             await cart.save();
//         }

//         return res.status(200).json({ message: 'Product added to cart successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to add the product to the cart' });
//     }
// };

const deleteCart = async (id: number, payload: CartNs.Cart) => {
    try {
        // Find the product based on the provided ID and delete it
        const cart = await Cart.findOneBy({ id });
        if (!cart) {
            return; // Product not found
        }
        await cart.remove();
        return cart;
    } catch (error) {
        throw new Error(`Failed to delete the product`);
    }
}

export {insertCart,deleteCart}