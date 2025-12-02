const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String, required:[true, 'Username is required'],unique:true },
    email:{type:String, required:[true, 'Email is required'],unique:true},
    password:{type:String, required:[true, 'Password is required'],minlength:[8, 'Password must be of atleast 8 length']},
    balance:{type:Number, required:true, default:0}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;

