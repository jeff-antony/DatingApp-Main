import express from 'express';
import multer from 'multer';
import { uploadUserPhotos, getUserPhotos, deleteUserPhoto,
    getOtherUsers
 } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();


router.post('/upload/photos/:userId', upload.array('photos', 10), uploadUserPhotos);
// router.post('/users/:userId/photos', upload.array('files', 6), uploadUserPhotos);
router.get('/users/:userId/photos', getUserPhotos);
router.delete('/users/:userId/photos/:public_id', deleteUserPhoto);

// Route to get other users' profiles -Dashboard user
router.get('/others', getOtherUsers);



export default router;
