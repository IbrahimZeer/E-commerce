import express from 'express';

import dataSource from '../db/dataSource.js';
import { ReviewNS } from '../../@types/type_review.js';
import { Review } from '../db/entities/Review.js'
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';


const insertFullNameReview = async (payload: Review, fullName: string, prodId: number) => {

  const product = await Product.find({ where: { id: prodId } });
  if (product) {
    const rev = await Review.create({
      fullName: fullName,
      rate: payload.rate,
      comments: payload.comments,
      products: product
    }).save();
    rev.products = product as Product[]
    return rev;
  } else {
    return "product not found"
  }
};

const insertCustomerReview = async (payload: Review, user: Customer, prodId: number) => {
  const product = await Product.find({ where: { id: prodId } });
  if (product) {
    const rev = await Review.create({
      rate: payload.rate,
      comments: payload.comments,
      products: product
    }).save();
    rev.products = product as Product[]
    return rev;
  } else {
    return "product not found"
  }
}

const updateReview = async (payload: ReviewNS.Review) => {

}

const deleteReview = async (revId: number) => {
  const review = await Review.findOne({ where: { id: revId } })
  if (review) {
    review.remove()
  }
}

const deleteFullNameReview = async (revId: number) => {
  const review = await Review.findOne({ where: { id: revId } })
  if (review) {
    review.remove()
  }
}

const getReviews = () => {
  const Reviews = Review.find()
  return Reviews
}

export {
  insertFullNameReview,
  deleteFullNameReview,
  insertCustomerReview,
  updateReview,
  deleteReview,
  getReviews
}