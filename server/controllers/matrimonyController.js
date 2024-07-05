import User from "../models/UserModel.js";

export const updateMatrimonyStatus = async (req,res) =>{
    const { userId } = req.params;
    const { isMatrimony } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      user.isMatrimony = isMatrimony;
      await user.save();
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error updating user matrimony status:', error);
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };
