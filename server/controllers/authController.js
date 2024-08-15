import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";
import { createError } from '../Utils/error.js';
import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';
import { hashPassword,comparePassword } from '../Utils/passwordUtils.js';
import { createJWT } from '../Utils/tokenUtils.js';



export const Register = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Extract userId from URL params
    let user = await User.findById(userId); // Use findById to query the user

    if (user) {
      // Update existing user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.dateOfBirth = req.body.dateOfBirth;
      user.city = req.body.city;
      user.state = req.body.state;
      user.district = req.body.district;
      user.qualification = req.body.qualification;
      user.professional = req.body.professional;
      user.password = hash;
      await user.save();
      res.status(200).json({ user, message: "User updated successfully" });
    } else {
      // Create new user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        googleID: req.body.googleID,
        displayName: req.body.displayName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        city: req.body.city,
        state: req.body.state,
        district: req.body.district,
        qualification: req.body.qualification,
        professional: req.body.professional,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    next(err);
  }
};



// export const Register = async (req, res, next) => {
//     try {
//       let user = await User.findOne(req.params.userID);
//       const salt = bcrypt.genSaltSync(10);
//       const hash = bcrypt.hashSync(req.body.password, salt);
//       if (user) {
//         user.age = req.body.age;
//         user.gender = req.body.gender;
//         user.dateOfBirth = req.body.dateOfBirth;
//         user.city = req.body.city;
//         user.state = req.body.state;
//         user.district = req.body.district;
//         user.qualification = req.body.qualification;
//         user.professional = req.body.professional;
//         user.password= hash,
//         await user.save();
//         res.status(200).json({user, message: "User updated successfully" });
//       }
//       else {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//         const newUser = new User({
//           googleID: req.body.googleID,
//           displayName: req.body.displayName,
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           email: req.body.email,
//           age: req.body.age,
//           gender: req.body.gender,
//           dateOfBirth: req.body.dateOfBirth,
//           city: req.body.city,
//           state: req.body.state,
//           district: req.body.district,
//           qualification: req.body.qualification,
//           professional: req.body.professional,
//           password: hash,
//         });
//         await newUser.save();
//       res.status(201).json({ message: "User created successfully" });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate email and password presence:
    if (!email || !password) {
      throw new createError(400, "Please provide both email and password.");
    }

    // 2. Find user by email:
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid email or password.");
    }

    // 3. Compare password hashes:
    const isValidUser = user && (await comparePassword(password, user.password));
if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

    // 4. Create JWT using the tokenUtils function:
    const token = createJWT({ id: user._id, email: user.email }); // Include only necessary user data
 
    // 5. Send successful login response:
    res.status(200).json({ user: { _id: user._id, email: user.email, isAdmin: user.isAdmin  }, token, message: "Login successful" });
    
  } catch (err) {
    next(err);
  }
};

// export const Login = async (req, res, next) => {
//     try {
//       const user = await User.findOne({email:req.body.email})
//       if (!user) return next(createError(404,"user not found"))
  
//         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
//         if (!isPasswordCorrect) return next(createError(400,"Invalid password"))
  
//           const token = jwt.sign({
//             id:user._id,
//             isAdmin:user.isAdmin,
//             isStaff:user.isStaff,
//             googleID:user.googleID,
//             password:user.password,
//             email:user.email
//           },
//           process.env.JWT
//         )
//           const{password,isAdmin,isStaff,...otherDetails}=user._doc
  
//       res.cookie("accessToken",token,{
//         httpOnly:true,
//       }).status(201).json(otherDetails);
//     } catch (err) {
//       next(err)
//     }
//   }


export const getUserData = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(`Fetching data for userId: ${userId}`);
  
  try {
      const user = await User.findById(userId);
      if (!user) {
          console.error(`User not found: ${userId}`);
          return next(createError(404, "User not found"));
      }
      res.status(200).json(user);
  } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
      next(createError(500, error.message));
  }
};