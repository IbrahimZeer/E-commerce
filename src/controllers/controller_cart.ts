import dataSource from '../db/dataSource.js';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';
import { OrderNS } from '../../@types/type_order.js';
import { ProductNS } from '../../@types/type_product.js';

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

const getCartController = async (payload: Cart) => {
    const cart = Cart.find()
    return cart
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
        throw new Error('Failed to update the cart');
    }
};

export {
    insertCartController,
    getCartController,
    updateCartController,
    addProductToCartController
}