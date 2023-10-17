import express from 'express';

const route = express.Router();

route.post('/add_product', (req, res) => {
    res.status(200).send('product adding successfully');
})


route.put('/update_product', (req, res) => {
    console.log('update product route details')
    res.status(200).send('product updated successfully');
})


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