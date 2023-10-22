import express from 'express';
import {
    insertCartController,
    insertCart,
    updateCartController,
    deleteCart,
    addProductToCartController
} from '../controllers/controller_cart.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { Cart } from '../db/entities/Cart.js';
import { Product } from '../db/entities/Products/Product.js';
import { authenticate } from '../middleware/authentication.js';

const route = express.Router();

// add products in cart
// route.post('/customer/addtocart', async (req, res) => {
//     const { customerName, productId, quantity, inOrder, totalPrice } = req.body;
//     const custName = await Customer.findOne({ where: { userName: req.body.customerName } })
//     const product = await Product.findOne({ where: { id: req.body.productId }, relations: ["carts"] })
//     if (!customerName || !productId || !quantity) {
//         console.log(req.body + 'from all is required')
//         return res.status(400).json({ message: "Please fill all fields" })
//     }
//     if (!custName) {
//         return res.status(404).json({ message: "Customer not found , you should to login or signup" })
//     }
//     if (!product) {
//         console.log(req.body.productId + 'from product ')
//         return res.status(404).json({ message: "Product not found" })
//     }
//     insertCartController(req.body).then((data) => {
//         console.log(data)
//         res.status(200).send("Product added to cart")
//     }).catch((err) => {
//         console.log(err)
//         res.status(500).json({ message: "Internal server error" })
//     })
// })

// route.post('/addProductToCart/:email', async (req, res) => {
//     try {
//         const customerEmail = req.params.email;
//         const productId = req.body.productId;
//         const here = await Customer.findOne({ where: { email: customerEmail } })
//         if (!here) {
//             res.status(404).json({ message: "Customer not found" })
//         }
//         const cart = await Cart.findOne({ where: { id: req.body.id } });
//         if (cart) {
//             addProductToCartController(req.body)
//             res.status(200).json({ message: "Product added to cart" })
//         } else {
//             updateCartController(req.body.id, req.body)
//         }
//     } catch (error) {
//         throw new Error('Internal server error');
//     }
// })



route.post('/add_cart', async (req, res) => {
    try {
        const newCart = await insertCart(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the category' });
    }
});


// route.post('/user/cart/addtocart',authenticate, async (req, res) =>{
// const customer= await Customer.findOneBy( {   where:{id}  });



//     const addcart =await addToCart()


// });


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