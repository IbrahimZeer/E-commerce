import express from 'express';
import {
  insertFullNameReview,
  insertCustomerReview,
  deleteReview,
  deleteFullNameReview,
  getProducts,
  updateReview
} from '../controllers/controller_review.js';
import { authenticate } from '../middleware/authentication.js';
import { ExpressNS } from '../../@types/index.js';
import { Product } from '../db/entities/Products/Product.js';
import { Review } from '../db/entities/Review.js';
import e from 'express';

const route = express.Router();


route.post('/create_customer_review', authenticate, async (req: ExpressNS.RequestWithUser, res, next) => {
  try {
    const customer = req.user;
    const fullName = req.body.fullName;
    if (!customer) {
      if (!fullName) {
        res.status(401).json("you are unauthorized , signin or insert your full name")
      } else {
        const fullNameRev = await insertFullNameReview(req.body, fullName);
        res.status(201).json({ message: "Review created successfully", fullNameRev });
      }
    } else {
      const userRev = await insertCustomerReview(req.body, customer);
      res.status(201).json({ message: "Review created successfully", userRev });
    }
  } catch (error) {
    console.error("Error creating reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.post('/create_fullName_review', async (req, res) => {
  try {
    const fullName = req.body.fullName;
    if (!fullName) {
      res.status(401).json("you are unauthorized , signin or insert your full name")
    } else {
      const fullNameRev = await insertFullNameReview(req.body, fullName);
      res.status(201).json({ message: "Review created successfully", fullNameRev });
    }
  } catch (error) {
    console.error("Error creating reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


route.put('/update_customer_review', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  const user = req.user;
  const revId = Number(req.body.id);
  if (user) {
    if (revId) {
      const updateRev = updateReview(req.body);
      res.status(200).json(updateRev);
    } else {
      res.status(404).json('review not found')
    }
  } else {
    res.status(401).json('you are unauthorized , signin or insert your full name')
  }
})

route.put('/update_fullName_review', async (req, res) => {
  const fullName = req.body.fullName;
  const revId = Number(req.body.id);
  if (fullName) {
    if (revId) {
      const updateRev = updateReview(req.body);
      res.status(200).json(updateRev);
    } else {
      res.status(404).json('review not found')
    }
  } else {
    res.status(401).json('you are unauthorized , signin or insert your full name')
  }
})


route.delete('/delete_customer_review/:id', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  const user = req.user;
  const fullName = req.body.fullName;
  const revId = Number(req.params.id);
  if (revId) {
    if (user) {
      await deleteReview(revId);
      res.status(200).json('review deleted successfully');
    }
    res.status(401).json('you are unauthorized , signin or insert your full name')
  } else {
    res.status(404).json('review not found')
  }
});


route.delete('/delete_fullName_review/:id', async (req, res) => {
  const fullName = req.body.fullName;
  const revId = Number(req.params.id);
  if (revId) {
    if (fullName) {
      await deleteFullNameReview(revId);
      res.status(200).json('review deleted successfully');
    } else {
      res.status(401).json('you are unauthorized , signin or insert your full name')
    }
  } else {
    res.status(404).json('review not found')
  }
});

route.get('/search/:id', async (req, res) => {
  const id = Number(req.params.id);
  const prodcut = await Product.findOne({ where: { id: id } })
  if (prodcut) {
    const getProduct = await getProducts(id)
    res.status(200).json(getProduct);
  }
})

export default route;