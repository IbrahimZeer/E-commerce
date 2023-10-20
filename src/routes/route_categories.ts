import express from 'express';
import { addCategoryController } from '../controllers/controller_categories';

const route = express.Router();

route.post('/add_categorie', (req, res) => {
    addCategoryController
})


route.put('/update_categorie', (req, res) => {
    console.log('update categorie route details')
    res.status(200).send('categorie updated successfully');
})


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