import express from 'express';
import { Request, Response } from 'express';

import dataSource from '../db/dataSource.js';
import { ReviewNS } from '../../@types/type_review.js';
import { Review } from '../db/entities/review.js'
import { getRepository } from 'typeorm';

const insertReview = async (payload: ReviewNS.Review) => {
    try {
        const { userId, fullName, productId, comment } = payload;

        const reviewRepository = getRepository(Review);
        const newReview = reviewRepository.create({
            userId,
            fullName,
            productId,
            comment,
        });

        await reviewRepository.save(newReview);

    }
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