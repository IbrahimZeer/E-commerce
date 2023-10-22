import express from 'express';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';
import { OrderNS } from '../../@types/type_order.js';
import { ProductNS } from '../../@types/type_product.js';
import { CustomerNS } from '../../@types/type_customer.js';

const insertCartController = async (payload: any) => {
    try {
        const customer = await Customer.findOne({ where: { userName: payload.userName } })
        const product = await Product.findOne({ where: { id: payload.id } });
        if (!customer || !product) {
            return ({ message: "Customer or Product not found" })
        }
        const newCart = await Cart.create({ ...payload });
        await newCart.save();
        return newCart

    } catch (error) {
        throw ({ message: "Internal server error" })
    }
}

const addProductToCartController = async (payload: Cart) => {
    const cart = await Cart.create({ ...payload })
}


const insertCart = async (payload: CartNs.Cart) => {
    try {
        const newCart = new Cart();
        newCart.quantity = payload.quantity;
        await newCart.save();
        return newCart;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}

const updateCartController = async (id: number, data: CartNs.Cart) => {
    try {
        const cart = await Cart.findOne({ where: { id: id } });
        if (cart) {
            cart.product = data.product;
            cart.quantity = data.quantity;
            await cart.save();
            return cart;
        } else {
            return ({ message: "Cart not found" });
        }
    } catch (error) {

    }
}



// const addToCart = async (customerId:Customer,cartId:Cart,payload:Cart ) => {
//     try {
//         const userId = req.body.id; // Assuming you have user authentication middleware
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

export {
    insertCartController,
    insertCart,
    updateCartController,
    deleteCart,
    addProductToCartController
}
