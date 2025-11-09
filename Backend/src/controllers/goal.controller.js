const Goal = require('../models/goal.model.js');
const User = require('../models/user.model.js'); //helpful in for addSavings part

const createGoal = async(req,res)=>{
    try{
        const { name, targetAmount, targetDate } = req.body;
        const userId = req.user;

        const goal = new Goal({ user:userId, name, targetAmount, targetDate});

        await goal.save();
        res.status(201).json(goal);
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const getGoals = async(req,res)=>{
    try{
        const userId = req.user;
        const goals = await Goal.find({user:userId});

        res.status(200).json(goals);

    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
};

const updateGoal = async(req,res)=>{
    try{
        const { name, targetAmount, targetDate } = req.body;
        const goalId =req.params.id;
        const userId =req.user;

        let goal = await Goal.findById(goalId);

        //Ensure this goal belongs to the logged-in user
        if(goal.user.toString() !== userId){
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        goal.name = name;
        goal.targetAmount = targetAmount;
        goal.targetDate = targetDate;

        await goal.save();
        res.status(200).json(goal);
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
};

const deleteGoal = async(req,res)=>{
    try{
        const goalId =req.params.id;
        const userId =req.user;

        let goal = await Goal.findById(goalId);
        //Ensure this goal belongs to the logged-in user
        if(goal.user.toString() !== userId){
            return res.status(401).json({ msg: 'Not authorized' });
        };

        await goal.deleteOne();
        res.status(200).json({msg:"Goal removed"});
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const addSavingsToGoal = async(req,res)=>{
    try{
        const {amount} = req.body;
        const goalId = req.params.id;
        const userId = req.user;

        const amountToAdd = Number(amount);

        const updatedGoal = await Goal.findOneAndUpdate(
            {_id:goalId, user:userId},           //find the goal that matches ur inputed goalId
            {$inc:{currentAmount:amountToAdd}},
            { new: true }                        //by default findOneAndUpdate() returns old version, this will help to return new updated bersion immedietly 

        );
        

        res.status(200).json(updatedGoal);
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

module.exports = {createGoal, getGoals, updateGoal, deleteGoal, addSavingsToGoal};