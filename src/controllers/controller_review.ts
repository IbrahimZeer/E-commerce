import express from 'express';

import dataSource from '../db/dataSource.js';
import { ReviewNS } from '../../@types/type_review.js';
import { Review } from '../db/entities/Review.js'
import { Customer } from '../db/entities/customers/Customer.js';
import { Product } from '../db/entities/Products/Product.js';


const insertFullNameReview = async (payload: Review, fullName: string) => {
  const product = await Product.findOne({ where: { id: payload.id } });
  if (!product) {
    return "product not found"
  }
  const rev = await Review.create({
    fullName: fullName,
    rate: payload.rate,
    comments: payload.comments,
    product: payload.id
  }).save();
  return rev;
};

const insertCustomerReview = async (payload: Review, user: Customer) => {
  const product = await Product.findOne({ where: { id: payload.id } });
  const findUser = await Customer.findOne({ where: { id: user.id } });
  if (!findUser) {
    return "user not found"
  }
  if (product) {
    const rev = await Review.create({
      customer: findUser,
      rate: payload.rate,
      comments: payload.comments,
      product: payload.id,
    }).save();
    return rev;
  } else {
    return "product not found"
  }
}

const updateReview = async (payload: Review) => {
  const review = await Review.findOne({ where: { id: payload.id } });
  if (review) {
    review.rate = payload.rate;
    review.comments = payload.comments;
    await review.save();
    return review;
  } else {
    return "review not found"
  }
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

const getProducts = async (id: number) => {
  const review = await Review.find({ where: { product: id } })
  return review;
}

export {
  insertFullNameReview,
  deleteFullNameReview,
  insertCustomerReview,
  updateReview,
  deleteReview,
  getProducts
}