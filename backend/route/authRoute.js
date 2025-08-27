import exress from 'express';
import { googleAuth, login, logOut, resetPassword, sendOtp, signUp, verifyOtp } from '../controller/authController.js';


const authRouter = exress.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.get('/logout', logOut)
authRouter.post('/send-otp', sendOtp)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/reset-Password', resetPassword)
authRouter.post('/googleauth', googleAuth)


export default authRouter;