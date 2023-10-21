import express from 'express';
import {  deleteCart, insertCart } from '../controllers/controller_cart.js';
import { Cart } from '../db/entities/Cart.js';
const route = express.Router();



route.post('/add_cart', async (req, res) => {
    try {
        const newCart = await insertCart(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the category' });
    }
});


// route.post('/user/cart/addtocart', addToCart);


route.delete('/delete_cart/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Cart.findOneBy({ id: id })
    if (id) {
        deleteCart(id, req.body).then(() => {
            res.status(200).send('Category deleted successfully');
        }).catch(error => {
            res.status(401).send('category not found')
        })
    } else {
        res.status(404).send('something went wrong');
    }
});

// route.put('/update_categorie/:id', async (req, res) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         // Assuming the request body contains the updated product data
//         const update = await updateCategoryController(id, req.body);

//         res.status(200).json(update);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update the product' });
//     }
// });



// route.get('/all_categorie', (req, res) => {
//     getCategoriesController().then((categories) => {
//         res.status(200).json(categories);
//     }).catch(error => {
//         res.status(500).json({ error: 'Failed to fetch categories' });
//     })
// })
// route.post('/user/cart/addtocart');
// get users cart
// update cart items , quantities total ...
// remove products from cart
// all cart items




export default route;