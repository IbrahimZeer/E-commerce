import express from 'express';
import { insertProduct } from '../controllers/controller_product.js';
import { updateProduct } from '../controllers/controller_admin.js';
import { ProductNS } from '../../@types/type_product.js';

const route = express.Router();

route.post('/add_product', async(req, res) => {
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
        const updatedProduct = await updateProduct(id, req.body);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product' });
    }
});


route.delete('/delete_product', (req, res) => {
    console.log('delete product route details')
    res.status(200).send('product deleted successfully');
});


route.get('/all_product', (req, res) => {
    console.log('list of products')
    res.status(200).send('list of products returned successfully');
})

// get product by id , other thinks
export default route;