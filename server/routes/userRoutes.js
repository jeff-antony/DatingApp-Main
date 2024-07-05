import express from 'express';
import multer from 'multer';
import { uploadUserPhotos, getUserPhotos, deleteUserPhoto } from '../controllers/userController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/users/:userId/photos', upload.array('files', 6), uploadUserPhotos);
router.get('/users/:userId/photos', getUserPhotos);
router.delete('/users/:userId/photos/:public_id', deleteUserPhoto);

export default router;
