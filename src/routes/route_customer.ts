import express from 'express';
import { insertCustomerController } from '../controllers/controller_customer.js';
import { login } from '../controllers/controller_customer.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { authenticate } from '../middleware/authentication.js';
import { profile } from '../controllers/controller_customer.js';

const route = express.Router();

route.post('/signup', async (req, res) => {
  try {
    const { email, password, userName, fName, lName } = req.body;
    if (!email || !password || !userName || fName || lName) {
      return res.status(400).send({ error: "All fields are required." });
    }
    const existingCustomer = await Customer.findOne({ where: { email: req.body.email } });
    if (existingCustomer) {
      return res.status(400).send({ error: "Customer already exists." });
    }
    await insertCustomerController(req.body);
    res.status(201).send('Customer successfully')

  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
})


route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      login(email, password)
      res.status(200).send('login successfully')
    } else {
      res.status(404).send("Email and Password are required")
    }
  } catch (error) {
    throw "something went wrong"
  }
})

route.post('/profile', authenticate, async (req, res) => {
  profile(req.body).then(data => {
    res.status(200).send(data)
  })
})

//create update on customer details
route.put('/update_customer', (req, res) => {

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