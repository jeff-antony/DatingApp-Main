import User from "../models/UserModel.js"
import Request from "../models/RequestModel.js"
import Conversation from "../models/ConversationModel.js"

// Send a friend request
export const sendFriendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        console.log('Request Body:', req.body);
        // Check if a friend request already exists
        const existingRequest = await Request.findOne({ sender: senderId, receiver: receiverId });
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        const friendRequest = new Request({ sender: senderId, receiver: receiverId });
        await friendRequest.save();

        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send friend request', error });
    }
    
};

// Get all friend requests for a user
export const getFriendRequests = async (req, res) => {
    try {
        const { userId } = req.params;
        const friendRequests = await Request.find({ receiver: userId, status: 'pending' })
            .populate('sender', 'displayName');

        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch friend requests', error });
    }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const friendRequest = await Request.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        // Add to friends list (for both sender and receiver)
        const conversation = new Conversation({
            members: [friendRequest.sender, friendRequest.receiver]
        });
        await conversation.save();

        res.status(200).json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to accept friend request', error });
    }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const friendRequest = await Request.findById(requestId);
        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        friendRequest.status = 'rejected';
        await friendRequest.save();

        res.status(200).json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject friend request', error });
    }
};

// Listing Accepted Friend Requests

export  const listAcceptedFriends = async (req, res) =>{
    try{
        const {userId} = req.params;
        //list accepted requests from sender or receiver
        const acceptedRequests = await Request.find({
            $or:[{sender:userId},{receiver:userId}],
            status:"accepted"})
       .populate("sender", "displayName email profilePic")
       .populate("receiver", "displayName email profilePic");

       const friends = acceptedRequests.map(request => {
        const friend = request.sender._id.toString()===userId ? request.receiver : request.sender;
        return{
            id: friend._id,
            displayName: friend.displayName,
            email: friend.email,
            profilePic: friend.profilePic

        }
       })
       res.status(200).json(friends);
    }
    catch(error){
        res.status(500).json({message:"server error faild to list friends",error})
    }
}


