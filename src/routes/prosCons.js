import express from 'express';
import { getProsCons, getProsConsById } from '../controllers/prosCons.js';


const router = express.Router();

// router.post('/', createProsCons);
// router.get('/', getProsCons);
router.get('/:id', getProsCons);
// router.put('/:id', updateProsCons);
// router.delete('/:id', deleteProsCons);

export const prosConsRouter =  router;
