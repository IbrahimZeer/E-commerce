import express from 'express';
import { insertCustomerController, insertUser, search_customers, updateCustomer } from '../controllers/controller_customer.js';
import { login } from '../controllers/controller_customer.js';
import { Customer } from '../db/entities/customers/Customer.js';
import { authenticate } from '../middleware/authentication.js';
import { profile } from '../controllers/controller_customer.js';
import { ExpressNS } from '../../@types/index.js';

const route = express.Router();
route.post('/signup', async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    if (!email || !password || !userName) {
      return res.status(400).send({ error: "All fields are required." });
    }
    console.log(email, password, userName + 'from try route')
    const newCustomer = await insertUser(req.body);
    return res.status(201).send(newCustomer);
  } catch (error) {
    console.log(email, password, userName + 'from catch route')
    console.log(error)
    res.status(500).send('Internal server error')
  }
})

// route.post('/signup_profile', async (req, res) => {
//   try {
//     const { email, password, userName, fName, lName } = req.body;
//     if (!email || !password || !userName || fName || lName) {
//       return res.status(400).send({ error: "All fields are required." });
//     }
//     const existingCustomer = await Customer.findOne({ where: { email: req.body.email } });
//     if (existingCustomer) {
//       return res.status(400).send({ error: "Customer already exists." });
//     }
//     await insertUser(req.body);
//     res.status(201).send('Customer successfully')
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Internal server error')
//   }
// })


route.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      await login(email, password)
      return res.status(200).send('login successfully')
    } else {
      return res.status(404).send("Email and Password are required")
    }
  } catch (error) {
    console.log(error)
    throw "something went wrong"
  }
})

route.post('/profile', async (req, res) => {
  profile(req.body).then(data => {
    res.status(200).send(data)
  })
})

route.post('/profile', async (req, res) => { profile(req.body).then(data => { res.status(200).send(data) }) })


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

// route.post('/profile', authenticate, async (req, res) => {
//   profile(req.body).then(data => {
//     res.status(200).send(data)
//   })
// })


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
    const customer = req.user;
    if (!customer) {
      res.status(401).send('you are unauthorized')
    }
    // await updateCustomer(req.body, customer);
  } catch (error) {

  }
})


route.delete('/delete_customer', (req, res) => {
  console.log('delete customer route details')
  res.status(200).send('customer deleted successfully');
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