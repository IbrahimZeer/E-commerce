import express from 'express';
import { CategoryNs } from '../../@types/type_category.js';
import { Category } from '../db/entities/Products/Category.js';



const insertCategory = async (payload: CategoryNs.Category) => {
    try {
        const newCategory = new Category();
        newCategory.catName = payload.catName;
        newCategory.catDes = payload.catDes;

        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw new Error('Failed to insert category');
    }
}

const updateCategory = async (id: number, payload: CategoryNs.Category) => {
    try {
        const category = await Category.findOne({ where: { id } });

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


const delete_categorie = async (payload: CategoryNs.Category) => {

}
export {
    insertCategory,
    updateCategory,
    delete_categorie

}