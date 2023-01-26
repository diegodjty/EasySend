import express from 'express';
const router = express.Router();
import { newLink } from '../controllers/linksController.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

router.post('/', auth, newLink);

export default router;
