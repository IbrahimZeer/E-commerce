import express from 'express';

import dataSource from '../db/dataSource.js';
import { ReviewNS } from '../../@types/type_review.js';
import { Review } from '../db/entities/Review.js'
import { getRepository } from 'typeorm';


const insertReview = async (payload: ReviewNS.Review) => {
  // const reviewRepository = getRepository(Review);
  // const customer = 

  // if () {

  // } else {
  //   if (fullName) {
  //     res.status(200).send('any')
  //   }
}


// // Create a new review entity using payload properties
// const newReview = reviewRepository.create({
//   userId: payload.userId,
//   fullName: payload.fullName,
//   productId: payload.productId,
//   comments: payload.comment,
//   //...payload
// });

// // Save the new review entity to the database
// await reviewRepository.save(newReview);
// };

const updateReview = async (payload: ReviewNS.Review) => {

}

const deleteReview = async (payload: ReviewNS.Review) => {

}

const getReviews = () => {
  const Reviews = Review.find()
  return Reviews
}

export {
  insertReview,
  updateReview,
  deleteReview,
  getReviews
}