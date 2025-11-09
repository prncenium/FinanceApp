const Transaction = require('../models/transaction.model.js');
const User = require('../models/user.model.js');

const transferMoney = async(req,res)=>{
    try{
        const {receiverUsername, amount} = req.body;
        const senderId =req.user;

        const transferAmount = Number(amount);
        //checking if sender exist
        const sender = await User.findById(senderId);
        if(!sender){
            return res.status(404).json({msg:"sender not found!!"})
        }
        //cehcking if recifer exist
        const receiver = await User.findOne({username: receiverUsername});
        if(!receiver){
            return res.status(404).json({msg:"Reciver not found!!"})
        }

        //checking if money exist or not 
        if(sender.balance <transferAmount){
            return res.status(400).json({msg:"Insufficient balance"});
        }

        //substracting money and $inc: is just increment operator in mongo DB
        await User.findByIdAndUpdate(senderId, {$inc: {balance: -transferAmount}});
        //adding money
        await User.findByIdAndUpdate(receiver._id, {$inc: {balance: transferAmount}});

        //making receipt 
        const transaction = new Transaction({ sender:senderId, receiver: receiver._id, amount:transferAmount,status:'completed'});
        await transaction.save();
        res.status(200).json({msg:"Transfer sucessfull"});
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error during transfer' });
    }
}

const getTransactionHistory = async (req,res)=>{
    try{
        const userId = req.user;

        const transactions = await Transaction.find({ 
            $or:[{sender:userId},{receiver:userId}]    //find all transaction jha jha mera user ka naam aya h, either pesa lene mei ya dene mei 
        })
        .populate('sender', 'username')       //receiver hume number deta (_id) agr populate na kro to
        .populate('receiver','username')     //sender hume number deta (_id) agr populate na kro to
        .sort({createdAt: -1}); //sort it by created it and newest--> oldest sorting
        res.status(200).json(transactions);
    }
    catch(error){
        res.status(500).json({ msg: 'Server Error during transfer' });
    }
}

module.exports = {transferMoney, getTransactionHistory};