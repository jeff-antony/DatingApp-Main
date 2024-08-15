import Message from "../models/MessageModel.js";
import Conversation from "../models/ConversationModel.js";

// Fetch all conversations for a user
export const getConversations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({ members: userId })
            .populate('members', 'username');
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch conversations', error });
    }
};

// Fetch messages for a conversation
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId })
            .populate('senderId', 'username');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error });
    }
};

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, senderId, text } = req.body;
        const newMessage = new Message({ conversationId, senderId, text });
        const savedMessage = await newMessage.save();

        // Populate sender details
        await savedMessage.populate('senderId', 'username').execPopulate();

        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
    }
};

// Create a new conversation
export const createConversation = async (req, res) => {
    try {
        const { members } = req.body;
        const newConversation = new Conversation({ members });
        const savedConversation = await newConversation.save();

        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create conversation', error });
    }
};