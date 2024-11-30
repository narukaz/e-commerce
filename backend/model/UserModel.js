import {model, Schema} from 'mongoose'

const userModel = new Schema ({
    userName: {
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true,
    },
    role: { type:String, default:'user'}
},
{timestamps:true})


const User = model( 'users', userModel)

export default User