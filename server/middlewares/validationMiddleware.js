import { body,param ,validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";


import User from "../models/UserModel.js";
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        
        throw new BadRequestError(errorMessages);
        }
        next();
        },
        ];
        };
        



export const validateRegisterInput = withValidationErrors
([
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').custom(async(email)=>{
    const user = await User.findOne({ email });
    if (user) throw new BadRequestError('email already exists');
  }),
  body('password').notEmpty().withMessage('password is required')
  .isLength({min:3}).withMessage('password must be at least 8 length long'),
  body('lastName').notEmpty().withMessage('lastName is required'),
  body('city').notEmpty().withMessage('city is required'),
  body('gender').notEmpty().withMessage('gender is required'),
  body('state').notEmpty().withMessage('state is required'),
  body('dateOfBirth').notEmpty().withMessage('date of birth is required'),
  body('qualification').notEmpty().withMessage('qualification is required'),
  body('professional').notEmpty().withMessage('state is required'),
  
])



export const validateLoginInput = withValidationErrors
([
 
  body('email')
  .notEmpty()
  .withMessage('email is required')
  .isEmail()
  .withMessage('Invalid Email format'),
  body('password').notEmpty().withMessage('password is required')
  
]);

export const validateUpdateUserInput = withValidationErrors
([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .custom(async(email, {req})=>{
      const user = await User.findOne({email});
        if (user && user._id.toString()!== req.user.userId) 
          throw new BadRequestError('email already exists');
    }),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('password').notEmpty().withMessage('password is required')
    .isLength({min:3}).withMessage('password must be at least 8 length long'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('city').notEmpty().withMessage('city is required'),
    body('gender').notEmpty().withMessage('gender is required'),
    body('state').notEmpty().withMessage('state is required'),
    body('dateOfBirth').notEmpty().withMessage('date of birth is required'),
    body('qualification').notEmpty().withMessage('qualification is required'),
    body('professional').notEmpty().withMessage('state is required'),

])

