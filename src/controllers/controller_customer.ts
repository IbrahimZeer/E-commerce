import express from 'express';
import dataSource from '../db/dataSource.js';
import { CustomerNS } from '../../@types/type_customer.js';
import { Customer } from '../db/entities/customers/Customer.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"





const insertCustomer = async (payload: Customer) => {
    return console.log(payload)
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


const login = async (email: string, password: string) => {
    // try {
    //     const customer = await Customer.findOneBy({
    //         email
    //     });

    //     if (!customer) {
    //         return undefined
    //     }

    //     const passwordMatching = await bcrypt.compare(password, customer?.password || '')

    //     if (customer && passwordMatching) {
    //         const token = jwt.sign({
    //             email: customer.email,
    //             userName: customer.fName,
    //             displayName: customer.displayName
    //         }, process.env.SECRET_KEY || "", {
    //             expiresIn: "14d"
    //         })

    //         return {
    //             userName: customer.displayName,
    //             token
    //         }
    //     } else {
    //         throw ("invalid email or password")
    //     }
    // } catch (error) {
    //     throw ("invalid email or password")
    // }
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