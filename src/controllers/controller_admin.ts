import express from 'express';
import dataSource from '../db/dataSource.js';
import { AdminNS } from '../../@types/type_admin.js';
import { Admin } from '../db/entities/Admin.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'


const insertAdmin = async (payload: Admin) => {
    const newAdmin = Admin.create({
        userName: payload.userName,
        email: payload.email,
        password: payload.password
    }).save()
    return {
        newAdmin
        // token
    }
}

const updateAdmin = async (payload: AdminNS.Admin) => {

}

const deleteAdmin = async (payload: AdminNS.Admin) => {

}

const insertProduct = async (payload: AdminNS.Admin) => {

}

const updateProduct = async (payload: AdminNS.Admin) => {

}

const deleteProduct = async (payload: AdminNS.Admin) => {

}

const login = async () => {

}


// const inssertRole = async (payload: AdminNS.Role) => {

// }


// const insertPermission = async (payload: AdminNS.Permission) => {

// }

const getAdmins = () => {
    const admins = Admin.find()
    return admins
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
    insertAdmin,
    updateAdmin,
    deleteAdmin,
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    // inssertRole,
    // insertPermission,
    getAdmins,
    getProducts,
    getRoles,
    getPermission
}