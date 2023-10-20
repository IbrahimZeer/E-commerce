import express from 'express';
import { insertCategory, updateCategory } from '../controllers/controller_category.js';
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



route.delete('/delete_categorie', (req, res) => {
    console.log('delete categorie route details')
    res.status(200).send('categorie deleted successfully');
});


route.get('/all_categorie', (req, res) => {
    console.log('list of categories')
    res.status(200).send('list of categories returned successfully');
})

// get categorie by id , other thinks
export default route;