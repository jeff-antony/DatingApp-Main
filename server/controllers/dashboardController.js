import User from "../models/UserModel.js";
import {createError} from "../errors/createError.js"


export const getOtherUsers = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming user data is attached to request

    // Exclude logged-in user from results
    const users = await User.find({ _id: { $ne: userId } });

    res.status(200).json(users);
  } catch (error) {
    next(createError (500, "server error")); // Pass error to error handling middleware
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the verified token

    // Fetch the user without the password field
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching current user' });
  }
};


export const updateCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the verified token
    const { firstName, lastName,
      city,state,district,interest,hobbies,qualification,professional,
      bio, photos } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
       firstName, lastName, city,state,district,interest,hobbies,
      bio, photos,qualification,professional
      },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
}
catch{
  res.status(500).json({ error: 'Error updating current user' });
}
}

// Get a user's profile by ID
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
      res.json(user);
  } else {
      res.status(404);
      throw new Error('User not found');
  }
};

// Send a friend request
// export const sendFriendRequest = async (req, res) => {
//   const { userId, friendId } = req.body;

//   const user = await User.findById(userId);
//   const friend = await User.findById(friendId);

//   if (user && friend) {
//       user.friendRequests.push(friendId);
//       await user.save();
//       res.status(200).json({ message: 'Friend request sent' });
//   } else {
//       res.status(404);
//       throw new Error('User not found');
//   }
// };
