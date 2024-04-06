// Import Mongoose
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    image: String,
    bio: String,
    threads: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: 'Thread' 
        }
    ],
    onboarded: { 
        type: Boolean, 
        default: false 
    },
    communities: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: 'Community' 
        }
    ]
}, { timestamps: true }); // Add timestamps

// Define the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Export the User model
export default User;
