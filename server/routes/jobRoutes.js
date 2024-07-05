
import express from 'express';
import { getJobs,updateJobDetails } from '../controllers/jobController.js';

const router = express.Router();

router.put('/users/jobs/:userId', updateJobDetails);
router.get('/jobs/userId', getJobs);

export default router;
