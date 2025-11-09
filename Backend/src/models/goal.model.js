// This tracks progress toward a savings goal.

const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    name:{type:String, required:[true, 'goal name is req']},
    targetAmount: {type: Number, required:[true, 'Target amount is required'],min: [0.1, 'Target amount should be more than Zero'],},
    currentAmount: {type: Number,required: true,default: 0,},
    targetDate: {type: Date,}
}, {timestamps:true});

const Goal  = mongoose.model('Goal', goalSchema);
module.exports = Goal;