
import express from "express"
import passport from "passport"
import { Router } from "express"
import dotenv from 'dotenv'
import { Register,Login,getUserData } from "../controllers/authController.js";
import { validateLoginInput } from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../Utils/verifyToken.js";





const router = express.Router()
dotenv.config()
const accoundSid = process.env.accoundSid
const authtoken = process.env.authtoken



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5100/api/auth/login' }),
    (req, res) => {
        // const isNew = req.user.isNew;
        const userId = req.user.user._id;
        const userPwd = req.user.user.password
        // console.log(req.user.user);
        if (userPwd==='') {
            res.redirect(`http://localhost:5173/register/${userId}`);
        } else {
            res.redirect('http://localhost:5173/dashboard');
        }
    }
);





router.post('/login',validateLoginInput, Login)

router.put('/register/:userId', Register)

router.get('/user/:userId',  getUserData);
// router.get('/userid-by-decoding',verifyToken,(req,res) =>{
//     try{
//         res.json({message:'you are authenticated',user:req.user})
//     }
//     catch(error){
//         console.log(error,"error");
//     }
// })



export default router;
