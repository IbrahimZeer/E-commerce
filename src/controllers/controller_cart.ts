import dataSource from '../db/dataSource.js';
import { CartNs } from '../../@types/type_cart.js';
import { Cart } from '../db/entities/Cart.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';
import { OrderNS } from '../../@types/type_order.js';
import { ProductNS } from '../../@types/type_product.js';

const insertCartController = async (customerName: string, Id: number, quantity: number, inOrder: CartNs.Type, payload: Cart) => {
    try {
        const customer = await Customer.findOne({ where: { userName: customerName } })
        const product = await Product.findOne({ where: { id: Id } });
        const cartQuantity = payload.quantity;
        const cartInOrder = payload.inOrder;
        if (!customer || !product) {
            return ({ message: "Customer or Product not found" })
        }
        const cart = await Cart.findOneBy({ id: payload.id })
        if (cart) {
            cart.product = product;
            cart.quantity = cartQuantity;
            cart.inOrder = cartInOrder;
            await cart.save();
            return cart;
        } else {
            const newCart = await Cart.create({ customer: customer, product: product, quantity: cartQuantity, inOrder: cartInOrder });
            await newCart.save();
            return newCart
        }
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

const updateCartController = async (id: string | number, data: CartNs.Cart) => {
    try {
        const cart = await Cart.findOne({ where: { id: String(id) } });
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