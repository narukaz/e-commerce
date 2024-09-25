
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../model/User.js'


//register
const registerUser = async(req,res)=>{
    const {userName, email, password} = req.body;

    try {

        const checkUser = await User.findOne({email})
        if(checkUser) return res.json({
            success:false,
            message:"email aready exists"
        })




        const hashPassword = await bcrypt.hash(password,12);  //hash password
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        });
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"Registeration successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:  "Some error has occured"
        })
        
    }
}


//login

const loginUser = async(req,res)=>{
    

    try {
        const {email, password} = req.body;
        const checkUser = await User.findOne({email})

        if(!checkUser) return res.json({
            success:false,
            message:"Account does not exist"
        })

        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if(!checkPassword) return res.json({
            success:false,
            message:'password is incorrect'
        })


        const token = jwt.sign({
                      id:checkUser._id, role: checkUser.role, email:checkUser.email
                      },"CLIENT_SECRET_KEY", {expiresIn:'60m'})

        res.cookie('token', token, {httpOnly:true, secure:false})
        .json({
            success:true,
            message:"login successfull!",
            user:{
                id:checkUser._id,
                role:checkUser.role,
                email:checkUser.email
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:  "Some error has occured"
        })
        
    }
}

//logout

const logoutUser = (req, res)=>{
    res.clearCookie('token').json({success:true, message:'logged out successfully'})
}



//middleware

const authMiddleware =(req,res,next)=>{
    const token = req.cookies.token
   
    if(!token) return res.status(401).json({success:false, message:"unauthorized token"})

        try {

            const decode = jwt.verify(token,"CLIENT_SECRET_KEY")
            req.user=decode
            next()
            
        } catch (error) {


            res.status(401).json({success:false, message:'unauthorized token'})
        }



}

//exports

export {registerUser, loginUser, logoutUser,authMiddleware}