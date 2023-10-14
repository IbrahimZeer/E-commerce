import express from 'express';

const route = express.Router();

route.post('/create', (req, res) => {
    console.log('create admin route')
    res.status(200).send('admin created successfully');
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