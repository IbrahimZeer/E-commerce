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
      return res.status(400).json({ error: "All fields are required." });
    }
    const customer = await Customer.findOne({ where: { email: req.body.email } })
    if (customer) {
      return res.status(400).json({ error: "Email already exists." });
    } else {
      const existingCustomer = await Customer.findOne({ where: { userName: req.body.userName } });
      if (!existingCustomer) {
        const newCustomer = await insertUser(req.body)
        res.status(201).json(newCustomer)
      } else {
        res.status(400).json({ error: "User Name already exists." });
      }
    }
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})

route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const custlogin = await login(email, password)
      return res.status(200).json(custlogin)
    } else {
      return res.status(404).json("Email and Password are required")
    }
  } catch (error) {
    console.log(error)
    throw "something went wrong"
  }
})

route.put('/update_customer', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      res.status(401).json('you are unauthorized')
    } else {
      await updateCustomer(req.body, email)
        .then(() => {
          res.status(200).json('customer updated successfully');
        })
        .catch(() => {
          res.status(400).json('something in data are lost')
        })
    }
  } catch (error) {
    res.status(500).json('Internal server error')
  }
})

route.delete('/delete_customer', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  const customer = req?.user;
  if (!customer) {
    res.status(401).json('you are unauthorized')
  } else {
    await deleteCustomer(customer)
    res.status(200).json('customer deleted successfully');
  }
});


route.get('/all_customer', (req, res) => {
  console.log('list of customers')
  res.status(200).json('list of customers returned successfully');
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

export default route;