const mongoose = require('mongoose');
const Category = require('./category.model');

//iss month kitta expense krunga, uski list h... mei apni trf sei kitta expense krunga hrr samaan pr
const budgetSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:'Category', required:true},
    amount: {type: Number, required: [true, 'Budget amount is required'],min: [0.01, 'Budget must be greater than zero']},
    period: {type: String,required: true, enum: ['monthly', 'yearly'],default: 'monthly'}
    
}, { timestamps: true });
const Budget= mongoose.model('Budget', budgetSchema);
module.exports = Budget;