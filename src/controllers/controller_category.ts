import express from 'express';
import { CategoryNs } from '../../@types/type_category.js';
import { Category } from '../db/entities/Products/Category.js';
import dataSource from '../db/dataSource.js';
import { Product } from '../db/entities/Products/Product.js';

const getCategoryProductsController = async (id: number, payload: CategoryNs.Category) => {
    try {
        const cat = await dataSource.manager.findOneBy(Category, { id: payload.id });
        let relate = await dataSource.createQueryBuilder().relation(Category, "products").of(cat).loadMany();
        await cat?.save();
        relate?.forEach(async (product) => {
            await product.save();
        });
        return { cat, relate }
    } catch (error) {
        throw new Error('Failed to insert category');
    }

}


const insertCategoryController = async (payload: Category) => {
    try {
        const category = await Category.create({
            ...payload
        }).save()
        return category;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}


const addProductToCategoryController = async (category: Category, product: Product) => {
    try {
        category.product = product.id
        category.save();
        return category;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}


const updateCategoryController = async (id: number, payload: CategoryNs.Category) => {
    try {
        const category = await Category.findOne({ where: { id } })
        if (!category) {
            throw new Error('Product not found');
        }
        // Update the product properties
        category.catName = payload.catName;
        category.catDes = payload.catDes;
        await category.save();
        return category;
    } catch (error) {
        throw new Error(`Failed to update the product`);
    }
};


const deleteCategoryController = async (id: number, payload: CategoryNs.Category) => {
    try {
        const category = await Category.findOneBy({ id });
        if (!category) {
            return;
        }
        await category.remove();
        return category;
    } catch (error) {
        throw new Error(`Failed to delete the product`);
    }
}

const getCategoriesController = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}

const getCategoryByIdController = async (id: number, payload: CategoryNs.Category) => {
    try {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error(`Failed to fetch the category`);
    }
}


export {
    insertCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getCategoriesController,
    getCategoryByIdController,
    getCategoryProductsController,
    addProductToCategoryController
}