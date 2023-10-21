import express from 'express';
import { insertProduct } from '../controllers/controller_product.js';
// import { updateProduct } from '../controllers/controller_admin.js';
import { updateProduct } from '../controllers/controller_product.js';
import { ProductNS } from '../../@types/type_product.js';
import { getProducts } from '../controllers/controller_product.js';
import { deleteProduct } from '../controllers/controller_product.js';
import { authenticate } from '../middleware/authentication.js';

const route = express.Router();

route.post('/add_product', async (req, res) => {
    try {
        const payload = req.body; // Assuming the request body contains the necessary product data
        const newProduct = await insertProduct(payload);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the product' });
    }
});



route.put('/update_product/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        // Assuming the request body contains the updated product data
        const update = await updateProduct(id, req.body);

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product' });
    }
});

route.delete('/delete_product/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const update = await updateProduct(id, req.body);

        if (!update) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send('Product deleted successfully');
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the product' });
    }
});
route.get('/all_product',authenticate, (req, res, next) => {
    getProducts().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })

})


export default route;