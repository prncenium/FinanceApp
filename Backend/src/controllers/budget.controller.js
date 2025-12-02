const Budget = require('../models/budget.model.js');
const Category = require('../models/category.model.js');

const setBudget = async(req,res)=>{
    try{
        const { categoryId, amount, period } = req.body;
        const userId = req.user;

        //Verify the category belongs to the user, like user A khi category B mei fill na kr de  (ie. jo user usi ki category ho
        const category = await Category.findOne({_id:categoryId, user:userId})

        //if budget already exist 
        let budget = await Budget.findOne({user:userId, category:categoryId});

        if(budget){
            budget.amount = amount;
            budget.period = period;
            await budget.save();
        }
        else{
            budget = new Budget({ user:userId, category:categoryId, amount, period});
            await budget.save();
        }

        // This ensures the frontend gets the Category Name, not just the ID
        const populatedBudget = await Budget.findById(budget._id).populate('category', 'name type');
        res.status(200).json(populatedBudget);
    }
    catch(error){
        console.error("Error in setBudget:", error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const getBudget = async(req,res)=>{
    try{
        const userId = req.user;

        const budget = await Budget.find({user:userId}).populate('category', 'name type') //.find sei budget models k sare mil gaye 
        //but category models k to ref hai isliye populate use kia and mentioned category and then name and type
        res.status(200).json(budget);
    }
    catch(error){
        console.error("Error in getBudget:", error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
}

const updateBudget = async(req,res)=>{
    try{
        const {amount,period} = req.body;
        const budgetId = req.params.id;
        const userId = req.user;
        
        let budget = await Budget.findById(budgetId);
        if(!budget){
            return res.status(404).json({msg:"budget not found"})
        }
        //check khi user A budget of user B to nhi ched rha 
        if (budget.user.toString() !== userId) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        budget.amount = amount;
        budget.period = period;

        await budget.save();
        //populate before sending budget
        await budget.populate('category', 'name type');
        res.status(200).json(budget);

    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}

const deleteBudget = async(req,res)=>{
    try{
        let budgetId = req.params.id;
        let userId = req.user;

        const budget = await Budget.findById(budgetId);

        if(!budget){
            return res.status(404).json({ msg: 'Budget not found' });
        }
        //khi koi user A, user B ka budget to delete nahi kr rha 

        if(budget.user.toString() !==userId){
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await budget.deleteOne();
        res.status(200).json({msg:'Budget deleted'})
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error' });
    }
}
module.exports = {setBudget, getBudget, updateBudget, deleteBudget};