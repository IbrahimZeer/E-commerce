import express from 'express';
import dataSource from '../db/dataSource.js';
import { ProductNS } from "../../@types/type_product.js";
import { Product } from '../db/entities/Products/Product.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { OrderNS } from '../../@types/type_order.js';


const insertProduct = async (payload: ProductNS.Product) => {
    try {
        const newProduct = new Product();
        newProduct.productNo = payload.productNo;
        newProduct.productName = payload.productName;
        newProduct.description = payload.description;
        newProduct.quantity = payload.quantity;
        newProduct.price = payload.price;
        newProduct.isSold_Active = payload.isSold_Active;

        await newProduct.save();

        return newProduct;
    } catch (error) {
        throw new Error('Failed to insert the product');
    }
}
const updateProduct = async (id: number, payload: ProductNS.Product) => {
    try {
        const product = await Product.findOne({ where: { id } });

        if (!product) {
            throw new Error('Product not found');
        }

        // Update the product properties
        product.productNo = payload.productNo;
        product.productName = payload.productName;
        product.description = payload.description;
        product.quantity = payload.quantity;
        product.price = payload.price;
        product.isSold_Active = payload.isSold_Active;

        await product.save();

        return product;
    } catch (error) {
        throw new Error(`Failed to update the product`);
    }
};

const deleteProduct = async (payload: ProductNS.Product) => {

}

const login = async () => {

}


const inssertRole = async (payload: ProductNS.Product) => {

}


const insertPermission = async (payload: ProductNS.Product) => {

}



export {
    insertProduct,
    updateProduct,
    deleteProduct,
    login,
    inssertRole,
    insertPermission

}