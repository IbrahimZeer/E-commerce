import express from 'express';
import { insertCustomer, login } from '../controllers/controller_customer';

const route = express.Router();

route.post('/create_customer', (req, res) => {
    const { fname, lname, displayName, email, password } = req.body;
    if (fname && lname && displayName && email && password) {
        insertCustomer(req.body).then(() => {
            res.status(200).send('Customer created')
        }).catch(err => {
            console.log('somthing went wrong');
            res.status(500).send('something went wrong , try again');
        })
    } else {
        res.status(400).send('complete all required fields')
    }
})

/* Login Customer. */
route.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
      login(req.body.email, req.body.password).then((data) => {
        res.cookie('userName', data?.userName, { maxAge: 2 * 60 * 1000 })
        res.send(data?.token)
      }).catch((error) => {
        res.status(400).send(error)
      })
    } else {
      res.status(404).send("email and password are required")
    }
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