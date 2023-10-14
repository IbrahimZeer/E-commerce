import express from 'express';
import dataSource from '../db/dataSource.js';
import { ReviewNS } from '../../@types/type_review.js';
import { Review } from '../db/entities/review.js'


const insertReview = async (payload: ReviewNS.Review) => {

}

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