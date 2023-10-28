import express from 'express';
import {
  insertFullNameReview,
  insertCustomerReview,
  deleteReview,
  deleteFullNameReview
} from '../controllers/controller_review.js';
import { authenticate } from '../middleware/authentication.js';
import { ExpressNS } from '../../@types/index.js';

const route = express.Router();


route.post('/create_review/id', authenticate, async (req: ExpressNS.RequestWithUser, res, next) => {
  try {
    const prodId = Number(req.params.id);
    const customer = req.user;
    const fullName = req.body.fullName;
    if (!customer) {
      if (!fullName) {
        res.status(401).send("you are unauthorized , signin or insert your full name")
      } else {
        const fullNameRev = await insertFullNameReview(req.body, fullName, prodId);
        res.status(201).json({ message: "Review created successfully", fullNameRev });
      }
    } else {
      const userRev = await insertCustomerReview(req.body, customer, prodId);
      res.status(201).json({ message: "Review created successfully", userRev });
    }
  } catch (error) {
    console.error("Error creating reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


route.put('/update_review', (req, res) => {
  console.log('update review route details')
  res.status(200).send('review updated successfully');
})


route.delete('/delete_review/:id', authenticate, async (req: ExpressNS.RequestWithUser, res) => {
  const user = req.user;
  const fullName = req.body.fullName;
  const revId = Number(req.params.id);
  if (revId) {
    if (user) {
      await deleteReview(revId);
      res.status(200).send('review deleted successfully');
    } else {
      if (fullName) {
        await deleteFullNameReview(revId);
        res.status(200).send('review deleted successfully');
      } else {
        res.status(401).send('you are unauthorized , signin or insert your full name')
      }
      res.status(401).send('you are unauthorized , signin or insert your full name')
    }
  } else {
    res.status(404).send('review not found')
  }
});


route.get('/all_review/:id', authenticate, async (req, res) => {
  console.log('list of reviews')
  res.status(200).send('list of reviews returned successfully');
})

// get all reviews for a product
// get reviews by customer
// update review
// delete review

export default route;