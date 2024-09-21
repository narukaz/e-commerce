
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../model/User.js'


//register
const registerUser = async(req,res)=>{
    const {userName, email, password} = req.body;

    try {
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

const login = async(req,res)=>{
    const {email, password} = req.body;

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:  "Some error has occured"
        })
        
    }
}

//logout







//exports

export {registerUser}