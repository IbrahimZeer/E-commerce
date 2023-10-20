import express from 'express';
import { delete_categorie, insertCategory, updateCategory } from '../controllers/controller_category.js';
import { Category } from '../db/entities/Products/Category.js';
import e from 'express';
const route = express.Router();



route.post('/add_categorie', async (req, res) => {
    try {
        const newCategory = await insertCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the category' });
    }
});

route.put('/update_categorie/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        // Assuming the request body contains the updated product data
        const update = await updateCategory(id, req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product' });
    }
});



route.delete('/delete_categorie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Category.findOneBy({ id: id })
    if (id) {
        delete_categorie(id, req.body).then(() => {
            res.status(200).send('Category deleted successfully');
        }).catch(error => {
            res.status(401).send('category not found')
        })
    } else {
        res.status(404).send('something went wrong');
    }
});


route.get('/all_categorie', (req, res) => {
    console.log('list of categories')
    res.status(200).send('list of categories returned successfully');
})

// get categorie by id , other thinks
export default route;