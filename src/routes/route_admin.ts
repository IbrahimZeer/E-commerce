import express from 'express';
import { insertAdmin } from '../controllers/controller_admin.js';

const route = express.Router();

route.post('/signup', async (req, res) => {
    try {
        // const { userName, email, password } = req.body;
        console.log(req.body);
        await insertAdmin(req.body).then(() => {
            res.status(201).send('Admin successfully')
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('rnternal server error')
    }
})


route.put('/update', (req, res) => {
    console.log('update admin route details')
    res.status(200).send('admin updated successfully');
})


route.delete('/admin', (req, res) => {
    console.log('delete admin route details')
    res.status(200).send('admin deleted successfully');
});


route.get('/admins', (req, res) => {
    console.log('list of admins')
    res.status(200).send('list of admins returned successfully');
})


export default route;