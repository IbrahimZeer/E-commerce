import express from 'express';
import { insertReview } from '../controllers/controller_review';

const route = express.Router();



route.post('/create_review', (req, res, next) => {
    insertReview(req.body).then(data => {
      res.status(201).send(data)
    }).catch(error => {
      res.status(500).send("something went wrong")
    })
  });
// route.post('/create_review', (req, res) => {
//     console.log('create review route')
//     res.status(200).send('review created successfully');
// })


route.put('/update_review', (req, res) => {
    console.log('update review route details')
    res.status(200).send('review updated successfully');
})


route.delete('/delete_review', (req, res) => {
    console.log('delete review route details')
    res.status(200).send('review deleted successfully');
});


route.get('/all_review', (req, res) => {
    console.log('list of reviews')
    res.status(200).send('list of reviews returned successfully');
})


export default route;