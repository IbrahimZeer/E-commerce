import express from 'express';
import dataSource from '../db/dataSource.js';
import { OrderNS } from '../../@types/type_order.js';
import { Order } from '../db/entities/orders/Order.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'
import { Like } from 'typeorm';
import { Customer } from '../db/entities/customers/Customer.js';

const insertOrder = async (payload: Order, productPrice: number, customer: Customer) => {
    try {
        // let cust = custoemr as Customer
        const newOrder = await Order.create({
            orderAddress: payload.orderAddress,
            productPrice: productPrice,
            deliveryCost: payload.deliveryCost,
            discount: payload.discount,
            totalPrice: (productPrice + payload.deliveryCost) - payload.discount,
            customer: customer,
        }).save();
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
            order.totalPrice = (data.productPrice + data.deliveryCost) - data.discount;
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


const search_orders = async (orderAddress: string) => {
    try {
        return await Order.find({
            select: ["orderAddress", "productPrice", "discount"],
            where: {
                orderAddress: Like(`%${orderAddress}%`),
            },

            order: {
                createdAt: "DESC"
            }

        })

    } catch (error) {

        throw error;
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
    getPermission,
    search_orders
}