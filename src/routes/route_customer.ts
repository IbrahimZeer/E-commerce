import express from 'express';
import { insertUser, search_customers, updateCustomer, deleteCustomer } from '../controllers/controller_customer.js';
import { login } from '../controllers/controller_customer.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { authenticate } from '../middleware/authentication.js';
import { ExpressNS } from '../../@types/index.js';

const route = express.Router();

route.post('/', async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    if (!email || !password || !userName) {
      return res.status(400).send({ error: "All fields are required." });
    }
    console.log(email, password, userName + 'from try route')
    const newCustomer = await insertUser(req.body)
    res.status(201).send(newCustomer)
  } catch (error) {
    console.log(error)
    if (error === 'customer already exists') {
      return res.status(400).send({ error: "customer already exists" });
    }
    console.log(email, password, userName + 'from catch catch')
    res.status(500).send('Internal server error')
    // console.log(error)
  }
})

route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const custlogin = await login(email, password)
      return res.status(200).send(custlogin)
    } else {
      return res.status(404).send("Email and Password are required")
    }
  } catch (error) {
    console.log(error)
    throw "something went wrong"
  }
})

//create update on customer details
// route.put('/update_customer', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
//   try {
//     const customer = req.user;
//     if (!customer) {
//       res.status(401).send('you are unauthorized')
//     }
//     await updateCustomer(req.body, customer);
//   } catch (error) {

//   }
// })
route.put('/update_customer', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  try {
    const customerEmail = req.user?.email;
    console.log(`customer Id = , and customer is ${customerEmail}`)
    if (!customerEmail) {
      res.status(401).send('you are unauthorized')
    } else {
      await updateCustomer(req.body, customerEmail);
      res.status(200).send('customer updated successfully');
    }
  } catch (error) {

  }
})

route.delete('/delete_customer', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  const customer = req?.user;
  if (!customer) {
    res.status(401).send('you are unauthorized')
  } else {
    await deleteCustomer(customer)
    res.status(200).send('customer deleted successfully');
  }
});


route.get('/all_customer', (req, res) => {
  console.log('list of customers')
  res.status(200).send('list of customers returned successfully');
})

route.get('/search_customers/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;

    const name = await search_customers(userName)
    res.status(200).json(name);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search for customers' });
  }
});


// get user by id

export default route;