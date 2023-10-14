import express from 'express';
import dataSource from '../db/dataSource.js';
import { PaymentNS } from '../../@types/type_payment.js';
import { Transaction } from '../db/entities/payments/Transaction.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { Product } from '../db/entities/Products/Product.js'


const insertTransaction = async (payload: PaymentNS.transaction) => {

}

const updateTransaction = async (payload: PaymentNS.transaction) => {

}

const deleteTransaction = async (payload: PaymentNS.transaction) => {

}

const inssertRole = async (payload: PaymentNS.transaction) => {

}


const insertPermission = async (payload: PaymentNS.transaction) => {

}

const getTransactions = () => {
    const Transactions = Transaction.find()
    return Transactions
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
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    inssertRole,
    insertPermission,
    getTransactions,
    getProducts,
    getRoles,
    getPermission
}