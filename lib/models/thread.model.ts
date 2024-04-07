// Import Mongoose
import mongoose from 'mongoose';

// Define the Thread schema
const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    parentId :{
        type : String
    },
    children :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Thread'
        }
    ]
}, { timestamps: true }); // Add timestamps

// Define the Thread model
const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

// Export the Thread model
export default Thread;
