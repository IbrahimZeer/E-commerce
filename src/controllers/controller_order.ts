import express from 'express';
import dataSource from '../db/dataSource.js';
import { OrderNS } from '../../@types/type_order.js';
import { Order } from '../db/entities/orders/Order.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'

const insertOrder = async (payload: OrderNS.Order) => {
    console.log(payload);
    try {
        const newOrder = new Order();
        newOrder.orderAddress = payload.orderAddress;
        newOrder.productPrice = payload.productPrice;
        newOrder.deliveryCost = payload.deliveryCost;
        newOrder.discount = payload.discount;
        newOrder.totalPrice = payload.totalPrice;
        newOrder.orderDate = payload.orderDate;

        await newOrder.save();

        return newOrder;
    } catch (error) {

        throw new Error('Failed to insert order ');
    }
};



const updateOrder = async (id: number, data: OrderNS.Order) => {
    try {
        const order = await Order.findOne({ where: { id } });
        if (order) {
            order.orderAddress = data.orderAddress;
            order.productPrice = data.productPrice;
            order.deliveryCost = data.deliveryCost;
            order.discount = data.discount;
            order.totalPrice = data.totalPrice;
            order.orderDate = data.orderDate;
            await order.save();
            return order;
        } else {
            return null;
        }
    } catch (error) {
        throw new Error('Failed to update the order');
    }
};

const deleteOrder = async (payload: OrderNS.Order) => {

    try {
        const id = parseInt(payload.id, 10);
        const order = await Order.findOneBy({ id })
        if (order) {
            order.remove()
        }
        else {
            throw ("Orderid not found")
        }
    } catch (error) {
        throw ('An error occurred while deleting the order');
    }
};
const addProduct = async (payload: OrderNS.Order) => {

}

const updateProduct = async (payload: OrderNS.Order) => {

}

const removeProduct = async (payload: OrderNS.Order) => {

}

const login = async () => {

}


const inssertRole = async (payload: OrderNS.Order) => {
    
}


const insertPermission = async (payload: OrderNS.Order) => {

}

const getOrders = () => {
    const Orders = Order.find()
    return Orders
}

const getProducts = () => {
    const products = Product.find()
    return products
}

const getRoles = () => {
    const roles = Role.find()
    return roles
}

const getPermission = () => {
    const permissions = Permission.find()
    return permissions
}

export {
    insertOrder,
    updateOrder,
    deleteOrder,
    addProduct,
    updateProduct,
    removeProduct,
    login,
    inssertRole,
    insertPermission,
    getOrders,
    getRoles,
    getPermission
}