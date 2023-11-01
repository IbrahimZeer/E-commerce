import express from 'express';
import dataSource from '../db/dataSource.js';
import { PaymentNS } from '../../@types/type_payment.js';
import { Transaction } from '../db/entities/payments/Transaction.js'
import { Product } from '../db/entities/Products/Product.js'


const insertTransaction = async (payload: PaymentNS.transaction) => {

}

const updateTransaction = async (payload: PaymentNS.transaction) => {

}

const deleteTransaction = async (payload: PaymentNS.transaction) => {

}


const getTransactions = () => {
    const Transactions = Transaction.find()
    return Transactions
}

const getProducts = () => {
    const products = Product.find()
    return products
}

export {
    insertTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactions,
    getProducts,
}