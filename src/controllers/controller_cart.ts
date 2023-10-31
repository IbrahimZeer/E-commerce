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



const addProductToCartController = async (cart: Cart, product: Product, quantity: number) => {
    try {
        cart.products.push(product);
        cart.quantity = quantity;
        cart.price = product.price;
        cart.totalPrice=(cart.quantity+cart.price)
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
        throw ({ message: "Internal server error" })
    }
}

const updateCartController = async (cart: Cart, payload: Cart) => {
    try {
        const updateQuantity = payload.quantity
        const updatePrice = payload.price
        const updateTotalPrice = updateQuantity * updatePrice
        cart.quantity = updateQuantity;
        cart.price = updatePrice;
        cart.totalPrice = updateTotalPrice;
        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
        throw ({ message: "Internal server error" })
    }
};

const deleteProductFromCartController = async (cart: Cart, productId: number) => {
    cart.products = cart.products.filter((product) => product.id !== productId)
    await cart.save();
    return cart;
}

export {
    deleteProductFromCartController,
    updateCartController,
    addProductToCartController
}
