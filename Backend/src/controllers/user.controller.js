const User = require('../models/user.model.js');

const getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const addFunds = async (req,res)=>{
    try{
        const {amount} = req.body;
        const userId = req.user;
        const amountToAdd = Number(amount);
        if (amountToAdd <= 0 || !amountToAdd) {
            return res.status(400).json({ msg: 'Amount must be positive.' });
        }

        //find user and update the amount
        const updatedUser = await User.findByIdAndUpdate(userId, 
            {$inc:{balance:amountToAdd}},
            {new:true}
        )

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.status(200).json({ balance: updatedUser.balance, msg: 'Funds added successfully.'});

    }
    catch(err){
        console.error('Error in addFunds' ,err.message);
        res.status(500).json({ msg: 'Server error during fund addition.' })
    }
}

module.exports = { getBalance,addFunds };
