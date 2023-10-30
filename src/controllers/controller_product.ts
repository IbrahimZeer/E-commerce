import express from 'express';
import dataSource from '../db/dataSource.js';
import { ProductNS } from "../../@types/type_product.js";
import { Product } from '../db/entities/Products/Product.js'
import { Role } from '../db/entities/Role.js'
import { Permission } from '../db/entities/Permission.js'
import { OrderNS } from '../../@types/type_order.js';
import { Like } from 'typeorm';

const insertProduct = async (payload: Product) => {
    try {
        const newProduct = new Product();
        newProduct.productNo = payload.productNo;
        newProduct.productName = payload.productName;
        newProduct.description = payload.description;
        newProduct.quantity = payload.quantity;
        newProduct.price = payload.price;
        newProduct.inOrder = payload.inOrder;
        newProduct.productPictures = payload.productPictures;
        await newProduct.save();
        return newProduct;
    } catch (error) {
        console.log('=================================================================================================>', error, '=================================================================================================>')
        throw new Error('Failed to insert the product');
    }
}
const updateProduct = async (id: number, payload: Product) => {
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
        product.inOrder = payload.inOrder;
        product.productPictures = payload.productPictures;
        await product.save();

        return product;
    } catch (error) {
        throw new Error(`Failed to update the product`);
    }
};

const deleteProduct = async (id: number) => {
    try {
        // Find the product based on the provided ID and delete it
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return null; // Product not found
        }
        await product.remove();
        return product;
    } catch (error) {
        throw new Error(`Failed to delete the product`);
    }
};

const getProducts = () => {
    const Products = Product.find()
    return Products
}


const searchProducts = async (productName: string) => {
    try {
        return await Product.find({
            select: ["productName", "description", "price"],
            where: {
                productName: Like(`%${productName}%`),
            },
            order: {
                createdAt: "DESC"
            }
        })
    } catch (error) {
        throw error;
    }

};
export {
    insertProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    searchProducts
}