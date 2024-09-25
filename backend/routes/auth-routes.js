import {Router} from 'express'
import { loginUser, registerUser, logoutUser, authMiddleware } from '../controller/auth/authController.js'

const router = Router()

router.post('/register',registerUser )
router.post('/login',loginUser )
router.post('/logout',logoutUser )
router.get('/check-auth', authMiddleware, (req,res) => {
    const {user}=req
res.status(200).json({success:true, message:'Authenticated user', user})
})


export default router;