import express from 'express';
import { deleteCategoryController, addProductToCategoryController, getCategoriesController, updateCategoryController, insertCategoryController, getCategoryByIdController, getCategoryProductsController } from '../controllers/controller_category.js';
import { Category } from '../db/entities/Products/Category.js';
import { OneToOne, Relation, } from 'typeorm';
import { Product } from '../db/entities/Products/Product.js';
import { Adminauthentication } from '../middleware/admin_authentication.js';
const route = express.Router();





route.put('/add_product_in_category', Adminauthentication, async (req, res) => {
    try {
        const category = req.body.id;
        console.log("category ID = ", category);
        const products = req.body.products;
        const categoryFound = await Category.findOne({ where: { id: category } });
        console.log(categoryFound);
        const productFound = await Product.findOne({ where: { id: products } });
        if (!categoryFound) {
            return res.status(404).json({ message: "Category not found" })
        }
        if (!productFound) {
            return res.status(404).json({ message: "Product not found" })
        }
        const added = await addProductToCategoryController(category, req.body)
        res.status(200).json(added);

    } catch (error) {
        throw new Error('Internal server error');
    }
})


route.post('/add_categorie', async (req, res) => {
    try {
        const newCategory = await insertCategoryController(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the category' });
    }
});

route.put('/update_categorie/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const update = await updateCategoryController(id, req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product' });
    }
});



route.delete('/delete_categorie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Category.findOneBy({ id: id })
    if (id) {
        deleteCategoryController(id, req.body).then(() => {
            res.status(200).json('Category deleted successfully');
        }).catch(error => {
            res.status(401).json('category not found')
        })
    } else {
        res.status(404).json('something went wrong');
    }
});


route.get('/all_categorie', (req, res) => {
    getCategoriesController().then((categories) => {
        res.status(200).json(categories);
    }).catch(error => {
        res.status(500).json({ error: 'Failed to fetch categories' });
    })
})

route.get('/all_product_in_category/:id', (req, res) => {
    const id = parseInt(req.params.id);
    getCategoryProductsController(id, req.body)
});
export default route;