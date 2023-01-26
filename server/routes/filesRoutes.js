import express from 'express';
const router = express.Router();
import { uploadFile, deleteFile } from '../controllers/filesControllers.js';
import auth from '../middleware/auth.js';

router.post('/', uploadFile);
router.delete('/:id', deleteFile);

export default router;
