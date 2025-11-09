const mongoose = require('mongoose');


//what is money being spent on or money came from where, (label lagane ko ) : [what type of income/expense it is.]
const categorySchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    name:{type:String, required:[true, 'Category name is required']},
    type:{type:String, required:true, enum:['income', 'expense']}
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;