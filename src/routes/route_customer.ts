import express from 'express';
import { insertCustomerController } from '../controllers/controller_customer.js';
import { login } from '../controllers/controller_customer.js';

const route = express.Router();

route.post('/signup', async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      return res.status(400).json({ error: "All fields are required." });
    }
    await insertCustomerController(req.body);
    res.status(201).send('Customer successfully')

  } catch (error) {
    console.log(error)
    res.status(500).send('rnternal server error')
  }
})


route.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    login(req.body.email, req.body.password).then((data) => {
      res.cookie('userName', data?.userName, { maxAge: 2 * 60 * 1000 })
      res.send(data?.token)
    }).catch((error) => {
      res.status(400).send(error)
    })
  } else {
    res.status(404).send("Email and Password are required")
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


// get user by id

export default route;