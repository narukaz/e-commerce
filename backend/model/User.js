import {Schema, Model} from 'mongoose'

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    }
})

const User = Model('User', UserSchema);
export default User