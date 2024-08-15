import express from 'express';
import { getConversations, getMessages, sendMessage, createConversation } from '../controllers/chatController.js';

const router = express.Router();

// Get all conversations for a user
router.get('/conversations/:userId', getConversations);

// Get all messages for a conversation
router.get('/messages/:conversationId', getMessages);

// Send a new message
router.post('/messages', sendMessage);

// Create a new conversation
router.post('/conversations', createConversation);


export default router;
