import express from 'express';
const router = express.Router();
import {
  getLink,
  newLink,
  getAllLinks,
} from '../controllers/linksController.js';

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

router.get('/', getAllLinks);

router.get('/:url', getLink);

export default router;
