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

// const insertCartController = async (payload: Cart, productId: number, user: Customer) => {
//     console.log(payload);
//     console.log(productId);
//     console.log(user);
//     try {

//         const customer = await Customer.findOne({ where: { id: user.id } });
//         const product = await Product.findOne({ where: { id: productId } });
//         if (!customer || !product) {
//             return ({ message: "Customer or Product not found" })
//         }
//         const newCart = await Cart.create({
//             quantity: payload.quantity,
//             price: payload.price,
//             totalPrice: payload.totalPrice,
//             customer: customer,
//             // product: [product]
//         });
//         return newCart.save();

//     } catch (error) {
//         console.log(error);
//         throw ({ message: "Internal server error" })
//     }
// }

const addProductToCartController = async (cart: Cart, product: Product) => {
    try {
        cart.products.push(product);
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
        throw ({ message: "Internal server error" })
    }
}


const insertCart = async (payload: CartNs.Cart) => {
    try {
        // let cart = await Cart.findOne({ where: { id: payload.id } })
        // cart?.quantity = payload.quantity;

        const find = await Cart.find().then(() => {
            Cart.update({ id: payload.id }, {
                quantity: payload.quantity,
                price
                    : payload.price,
                totalPrice: payload.quantity * payload.price
            })
        })
        // await find.save();
        return find;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}

const updateCartController = async (data: CartNs.Cart, user: Customer) => {
    // try {
    //     // const cart = await Cart.findOne({ where: { id: user.id } });
    //     if (cart) {
    //         cart.products = data.product;
    //         cart.quantity = data.quantity;
    //         await cart.save();
    //         return cart;
    //     } else {
    //         return ({ message: "Cart not found" });
    //     }
    // } catch (error) {
    //     throw new Error('Failed to update the cart');
    // }
};

export {
    // getCartController,
    updateCartController,
    addProductToCartController
}
