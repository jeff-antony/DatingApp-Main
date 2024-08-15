import express from "express";

import { sendFriendRequest, getFriendRequests, acceptFriendRequest, rejectFriendRequest,listAcceptedFriends
    
 } from './../controllers/friendRequestController.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Send a friend request
router.post('/send', sendFriendRequest);

// Get all friend requests for a user
router.get('/requests/:userId', getFriendRequests);

// Accept a friend request
router.post('/accept/:requestId', acceptFriendRequest);

// Reject a friend request
router.post('/reject/:requestId', rejectFriendRequest);

//List friends
router.get('/:userId/friends', listAcceptedFriends)


export default router;
