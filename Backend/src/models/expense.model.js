const mongoose = require('mongoose');
const Category = require('./category.model');


//kharcha ya savings  ka total data (This is the main record for tracking money. It links to both a User and a Category.)
const expenseSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    amount:{type:Number, required:[true, 'Amount is required'], min:[0.1, 'Amount should be more than Zero']},
    type:{type:String, required:true, enum:['income', 'expense']},
    Category:{type:mongoose.Schema.Types.ObjectId, ref:'Category', required:[true, 'Catehory is required']},
    description:{type:String, required:true},
    date:{type:Date, required:true, default:Date.now}
}, {timestamps:true});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;