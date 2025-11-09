const mongoose = require('mongoose');
const Category = require('./category.model');

//iss month kitta expense krunga, uski list h... mei apni trf sei kitta expense krunga hrr samaan pr
const budgetSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId},
    Category:{type:mongoose.Schema.Types.ObjectId},
    amount: {type: Number, required: [true, 'Budget amount is required'],min: [0.01, 'Budget must be greater than zero']},
    period: {type: String,required: true, enum: ['monthly', 'yearly'],default: 'monthly'}
    
})
const Budget= mongoose.model('Budget', budgetSchema);
module.exports = Budget;