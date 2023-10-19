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




const updateOrder = async (orderId: any, payload: OrderNS.Order) => {

    // try {
    //     const order = await Order.findOne(orderId);

    //     if (!order) {
    //         throw new Error('Order not found');
    //     }

    //     order.orderAddress = payload.orderAddress;
    //     order.productPrice = payload.productPrice;
    //     order.deliveryCost = payload.deliveryCost;
    //     order.discount = payload.discount;
    //     order.totalPrice = payload.totalPrice;
    //     order.orderDate = payload.orderDate;
    //     await order.save();

    //     return order; 
    // } catch (error) {
    //     throw new Error('Failed to update order ');
    // }
};

const deleteOrder = async (orderId: string) => {
    // try {
    //     const entityManager = getManager();
    //     const orderToDelete = await entityManager.findOne(Order,  { orderNo: orderId } );

    //     if (!orderToDelete) {
    //         throw new Error('Order not found');
    //     }

    //     await entityManager.remove(Order, orderToDelete);

    // } catch (error) {
    //     throw new Error('Failed to delete order: ');
    // }
};

const insertProduct = async (payload: OrderNS.Order) => {

}

const updateProduct = async (payload: OrderNS.Order) => {

}

const deleteProduct = async (payload: OrderNS.Order) => {

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
    // updateOrder,
    deleteOrder,
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    inssertRole,
    insertPermission,
    getOrders,
    getProducts,
    getRoles,
    getPermission
}