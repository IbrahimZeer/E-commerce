import express from 'express';
import { insertProduct, searchProducts } from '../controllers/controller_product.js';
// import { updateProduct } from '../controllers/controller_admin.js';
import { updateProduct } from '../controllers/controller_product.js';
import { ProductNS } from '../../@types/type_product.js';
import { getProducts } from '../controllers/controller_product.js';
import { deleteProduct } from '../controllers/controller_product.js';
import { Adminauthentication } from '../middleware/admin_authentication.js';
import { Product } from '../db/entities/Products/Product.js';
import { UploadedFile } from 'express-fileupload';
import { configS3 } from '../services/configS3fFile.js';


const route = express.Router();

route.post('/add_product', Adminauthentication, async (req, res) => {
    try {
        const payload = req.body; // Assuming the request body contains the necessary product data
        const uploadedFile = req.files?.productPictures as UploadedFile;
        //==========================S3==========================
        console.log(uploadedFile)
        if (!uploadedFile || !uploadedFile.data) {
            return res.status(400).json({ error: "Post should have an image" });
        }
        const S3 = await configS3();
        const uploadParams = {
            Bucket: process.env.S3_NAME || '',
            Body: Buffer.from(uploadedFile.data),
            Key: `${Date.now().toString()}.png`,
            ACL: 'public-read',
        };
        const data = await S3.upload(uploadParams).promise();
        req.body.productPictures = data.Location;
        //==========================S3==========================
        const newProduct = await insertProduct(payload);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error)
        console.log('=================================================================================================>', error, '=================================================================================================>')
        res.status(500).json({ error: 'Failed to create the product' });
    }
});

route.put('/update_product/:id', Adminauthentication, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        //==========================S3==========================
        const uploadedFile = req.files?.productPictures as UploadedFile;
        console.log(uploadedFile)
        if (!uploadedFile || !uploadedFile.data) {
            return res.status(400).json({ error: "Post should have an image" });
        }
        const S3 = await configS3();
        const uploadParams = {
            Bucket: process.env.S3_NAME || '',
            Body: Buffer.from(uploadedFile.data),
            Key: `${Date.now().toString()}.png`,
            ACL: 'public-read',
        };
        const data = await S3.upload(uploadParams).promise();
        req.body.productPictures = data.Location;
        //==========================S3==========================
        // Assuming the request body contains the updated product data
        const update = await updateProduct(id, req.body);
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the product' });
    }
});

route.delete('/delete_product/:id', Adminauthentication, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const update = await deleteProduct(id);
        if (!update) {
            res.status(404).send('Product not found');
        } else {
            res.status(200).send('Product deleted successfully');
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete the product' });
    }
});


route.get('/all_product', async (req, res) => {
    await getProducts().then(data => {
        res.status(200).send(data)
    }).catch(error => {
        res.status(404).send(error)
    })
})


route.get('/search_product/:productName', async (req, res) => {
    try {
        const productName = req.params.productName;
        const products = await searchProducts(productName);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search for products' });
    }
});
export default route;