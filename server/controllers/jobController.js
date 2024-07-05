import Job from "../models/JobModel.js";
import User from "../models/UserModel.js"

export const updateJobDetails = async (req, res) => {
  try {
    const { userId } = req.params; // Extract user ID from request parameters
    const { jobStatus, companyName, jobTitle, jobLocation, jobLevel } = req.body; // Destructure job data

    // Validate required fields (if applicable)
    // if (!userId || !jobStatus || !companyName || !jobTitle || !jobLocation || !jobLevel) {
    //   return res.status(400).json({ message: 'Missing required job details' });
    // }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Find user by ID
      { $set: { jobStatus, companyName, jobTitle, jobLocation, jobLevel } }, // Update job fields
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Job details updated successfully', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};











// export const createJob = async (req, res) => {
//     try {
//       const newJob = new Job(req.body);
//        await newJob.save();
//       res.status(201).json(newJob);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };


  
  export const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };