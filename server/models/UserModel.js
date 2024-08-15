import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: false,
        unique:true
    },
    displayName: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    age: {
        type: Number,
    },
    gender:{
        type: String,
    },
    email: {
        type: String,
        required: false,
        unique:true
    },
    dateOfBirth: {
        type: Date,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    interest: {
        type: String,
    },
    photos: [{
        url: String,
        public_id: String
    }],
    videos: [{
        url: String,
        public_id: String
    }],
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    hobbies: {
        type: String,
    },
    district: {
        type: String,
    },
    smokingHabits: {
        type: String,
        required: false,
      },
      drinkingHabits: {
        type: String,
        required: false,
      },
    profilePic: {
        type: String,
    },
    qualification: {
        type: String,
    },
    professional: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: false
    },
    bio:{
        type: String,
    },
    password: {
        type: String,
        
    },
    confirmPassword: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    jobStatus: { 
        type: String,
         required:false
         },
  companyName: {
     type: String, 
     required: false 
    },
  jobTitle: { 
    type: String, 
    required: false 
},
  jobLocation: { 
    type: String, 
    required: false 
},
jobLevel:{
    type:String,
    required:false
},
isMatrimony:{
    type: Boolean,
    default: false
},
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    }

},
{timestamp:true}
)


export default mongoose.model('User', UserSchema);