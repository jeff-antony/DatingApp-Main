import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js"
import { getOtherUsers, getCurrentUser,updateCurrentUser, getUserProfile,
    // sendFriendRequest
} from "../controllers/dashboardController.js";

const router = express.Router()

router.get("/others", verifyToken, getOtherUsers );
router.get("/current-user", verifyToken, getCurrentUser);
router.put("/update-profile", verifyToken, updateCurrentUser);
router.get("/get-userProfile/:id", verifyToken, getUserProfile);
// router.post("/send-request", verifyToken, sendFriendRequest);



export default router;