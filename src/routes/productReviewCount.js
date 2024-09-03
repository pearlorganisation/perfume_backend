import express from 'express';
import { deleteProductReviewCount, getProductReviewCountByPerfumeID } from '../controllers/productReviewCount.js';


const router = express.Router();

// router.post('/', createProductReviewCount);
// router.get('/', getProductReviewCounts);
router.get('/:id', getProductReviewCountByPerfumeID);
// router.put('/:id', updateProductReviewCount);
router.delete('/:id', deleteProductReviewCount);

export const productReviewRouter =  router;
