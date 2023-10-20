import dataSource from '../db/dataSource.js';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const insertCartController = async (payload: Cart) => {
    return dataSource.manager.transaction(async transaction => {
        const newCart = Cart.create({
            ...payload
        });
        await transaction.save(newCart);
    });
}

const getCartController = async (payload: Cart) => {
    const cart = Cart.find()
    return cart
}

const updateCartController = async (id: string | number, data: CartNs.Cart) => {
    try {
        const cart = await Cart.findOne({ where: { id: String(id) } });
        if (cart) {
            cart.product = data.product;
            cart.quantity = data.quantity;
            await cart.save();
            return cart;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Failed to update the cart');
    }
};

