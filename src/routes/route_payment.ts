import express from 'express';

const route = express.Router();

route.post('/create_payment', (req, res) => {
    console.log('create payment route')
    res.status(201).send('payment created successfully');
})


route.put('/update_payment', (req, res) => {
    console.log('update payment route details')
    res.status(200).send('payment updated successfully');
})


route.delete('/delete_payment', (req, res) => {
    console.log('delet payment route details')
    res.status(200).send('payment deleted successfully');
});


route.get('/all_payment', (req, res) => {
    console.log('list of payments')
    res.status(200).send('list of payments returned successfully');
})

// user payment history
// payment details

export default route;