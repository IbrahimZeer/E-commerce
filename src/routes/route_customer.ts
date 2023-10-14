import express from 'express';

const route = express.Router();

route.post('/create_customer', (req, res) => {
    console.log('create customer route')
    res.status(200).send('customer created successfully');
})


route.put('/update_customer', (req, res) => {
    console.log('update customer route details')
    res.status(200).send('customer updated successfully');
})


route.delete('/delete_customer', (req, res) => {
    console.log('delete customer route details')
    res.status(200).send('customer deleted successfully');
});


route.get('/all_customer', (req, res) => {
    console.log('list of customers')
    res.status(200).send('list of customers returned successfully');
})

export default route;