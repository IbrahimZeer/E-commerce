import dataSource from '../db/dataSource.js';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';
import { OrderNS } from '../../@types/type_order.js';
import { ProductNS } from '../../@types/type_product.js';

const insertCartController = async (payload: Cart, productId: number, user: Customer) => {
    console.log(payload);
    console.log(productId);
    console.log(user);
    try {
        const customer = await Customer.findOne({ where: { id: user.id } });
        const product = await Product.findOne({ where: { id: productId } });
        if (!customer || !product) {
            return ({ message: "Customer or Product not found" })
        }
        const newCart = await Cart.create({
            quantity: payload.quantity,
            price: payload.price,
            totalPrice: payload.totalPrice,
            customer: customer
        });
        return newCart.save();

    } catch (error) {
        console.log(error);
        throw ({ message: "Internal server error" })
    }
}

const addProductToCartController = async (payload: Cart, user: Customer) => {
    const cart = await Cart.create({ ...payload })
}

const getCartController = async (payload: Cart) => {
    const cart = Cart.find()
    return cart
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
    insertCartController,
    getCartController,
    updateCartController,
    addProductToCartController
}