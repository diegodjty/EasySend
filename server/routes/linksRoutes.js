import express from 'express';
const router = express.Router();
import { getLink, newLink } from '../controllers/linksController.js';
import { deleteFile } from '../controllers/filesControllers.js';
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

router.get('/:url', getLink, deleteFile);

export default router;
