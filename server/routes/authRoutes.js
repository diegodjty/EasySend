import express from 'express';
const router = express.Router();
import {
  authanticateUser,
  authanticatedUser,
} from '../controllers/authControllers.js';

router.post('/', authanticateUser);
router.get('/', authanticatedUser);

export default router;
