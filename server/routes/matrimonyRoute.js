import express from 'express'
import { updateMatrimonyStatus } from '../controllers/matrimonyController.js';
const router = express.Router();

router.put('/matrimony/:userId', updateMatrimonyStatus);

export default router;