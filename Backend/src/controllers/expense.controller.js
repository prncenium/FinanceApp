const Expense = require('../models/expense.model.js');
const category = require('../models/category.model.js');
const Category = require('../models/category.model.js');

const addExpense = async(req,res)=>{
    try{
       const { amount, type, category, description, date } = req.body;
       const userId = req.user;

       //This stops User A from adding an expense to a category that belongs to User B.
       const categoryExist = await Category.findOne({ _id:category, user:userId});
       if(!categoryExist){
        return res.status(404).json({msg:"category is not found or valid"});
       }

       const newExpense = new Expense({user:userId, amount, type, category, description, date});
       await newExpense.save();
       res.status(201).json(newExpense);
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const getExpenses = async (req,res)=>{
    try{
        const userId = req.user;
        //"After you find the expense, please take that category ID,
        //  go find the matching category, and replace the ID with its name and type."
        const expenses = await Expense.find({user:userId}).populate(
            'category',
            'name type'
        );

        res.status(200).json(expenses)
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const getExpenseById = async (req,res)=>{
    try{
        const userId = req.user;
        const expenseId = req.params.id;

        const expense = await Expense.findById(expenseId).populate(
            'category',
            'name type'
        );

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        //This stops User A from adding an expense to a category that belongs to User B.
        if(expense.user.toString()!== userId){
            return res.status(401).json({msg:'Not authorized'});
        }
        res.status(200).json(expense);

    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const updateExpense = async (req,res)=>{
    try{
        const userId = req.user;
        const expenseId = req.params.id;
        const { amount, type, category, description, date } = req.body;
        
        let expense = await Expense.findById(expenseId);
        if(!expense){
            return res.status(404).json({msg:"expense not found"});
        }
        //This stops User A from adding an expense to a category that belongs to User B.
        if(expense.user.toString()!== userId){
            return res.status(401).json({msg:'Not authorized'});
        }

        expense.amount = amount;
        expense.type = type;
        expense.category = category;
        expense.description = description;
        expense.date = date;

        await expense.save();
        res.status(200).json(expense);

    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const deleteExpense = async (req,res)=>{
    try{
        const userId = req.user;
        const expenseId =req.params.id;

        const expense = await Expense.findById(expenseId);
        if(!expense){
            return res.status(404).json({msg:"expense not found"})
        }

        if(expense.user.toString() !== userId){
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await expense.deleteOne();
        res.status(200).json({ msg: 'Expense removed' });
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}
module.exports = {addExpense, getExpenses, getExpenseById, updateExpense, deleteExpense}