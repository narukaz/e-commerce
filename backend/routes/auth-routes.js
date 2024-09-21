import {Router} from 'express'
import { registerUser } from '../controller/auth/authController'

const router = Router()

router.post('register',registerUser )

export default router;