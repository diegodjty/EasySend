import express from 'express';
const router = express.Router();
import { newLink } from '../controllers/linksController.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

router.post(
  '/',
  [
    check('name', 'Upload a file').not().isEmpty(),
    check('original_name', 'Upload a file').not().isEmpty(),
  ],
  auth,
  newLink
);

export default router;
