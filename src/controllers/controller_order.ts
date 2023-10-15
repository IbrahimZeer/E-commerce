import express from 'express';
import dataSource from '../db/dataSource.js';
import { OrderNS } from '../../@types/type_order.js';
import { Order } from '../db/entities/orders/order.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'


const insertOrder = async (payload: OrderNS.Order) => {

}

const updateOrder = async (payload: OrderNS.Order) => {

}

const deleteOrder = async (payload: OrderNS.Order) => {

}

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
    updateOrder,
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