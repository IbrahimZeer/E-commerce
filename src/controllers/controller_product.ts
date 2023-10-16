import express from 'express';
import dataSource from '../db/dataSource.js';
import { ProductNS } from "../../@types/type_product.js";
import { Product } from '../db/entities/Products/Product.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'


const insertProduct = async (payload: ProductNS.Product) => {

}

const updateProduct = async (payload: ProductNS.Product) => {

}

const deleteProduct = async (payload: ProductNS.Product) => {

}

const login = async () => {

}


const inssertRole = async (payload: ProductNS.Product) => {

}


const insertPermission = async (payload: ProductNS.Product) => {

}
() => {
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
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    inssertRole,
    insertPermission,
    getRoles,
    getPermission
}