import express from 'express';
import { insertCustomerController } from '../controllers/controller_customer.js';
import { login } from '../controllers/controller_customer.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { authenticate } from '../middleware/authentication.js';
import { profile } from '../controllers/controller_customer.js';
import { token } from 'morgan';
import { log } from 'console';

const route = express.Router();

route.post('/signup', async (req, res) => {
  try {
    const { email, password, userName, fName, lName } = req.body;
    if (!email || !password || !userName || !fName || !lName) {
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



/* Login User. */
route.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    login(req.body.email, req.body.password).then((data) => {
      res.send(data?.token)
    }).catch((error) => {
      res.status(400).send(error)
    })
  } else {
    res.status(404).send("email and password are required")
  }
})
route.post('/profile', authenticate, async (req, res) => {
  profile(req.body)
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