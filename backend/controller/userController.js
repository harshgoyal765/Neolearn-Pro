import uploadOnCloudinary from '../config/cloudinary.js';
import User from '../models/userModel.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;
    let updateData = { name, description };

    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
     
      if (uploaded) {
    updateData.photoUrl = uploaded; 
  }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password');

    console.log("Updated user data:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
   res.status(500).json({ message: `update profile error ${error.message}` });
  }
};
