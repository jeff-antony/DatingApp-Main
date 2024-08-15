import mongoose from 'mongoose';

const RequestSchema = 
new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true },
    receiver: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', required: true },
    status: { 
         type: String, 
         enum: ['pending', 'accepted', 'rejected'], 
         default: 'pending' },
    createdAt: { 
         type: Date, 
         default: Date.now 
        }
});

export default mongoose.model('Request', RequestSchema);