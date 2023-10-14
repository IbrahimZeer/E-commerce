import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'


const insertCustomer = async (payload: CustomerNS.Customer) => {

}

const updateCustomer = async (payload: CustomerNS.Customer) => {

}

const deleteCustomer = async (payload: CustomerNS.Customer) => {

}

const insertProduct = async (payload: CustomerNS.Customer) => {

}

const updateProduct = async (payload: CustomerNS.Customer) => {

}

const deleteProduct = async (payload: CustomerNS.Customer) => {

}

const login = async () => {

}


const inssertRole = async (payload: CustomerNS.Customer) => {

}


const insertPermission = async (payload: CustomerNS.Customer) => {

}

const getCustomers = () => {
    const Customers = Customer.find()
    return Customers
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
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    inssertRole,
    insertPermission,
    getCustomers,
    getProducts,
    getRoles,
    getPermission
}