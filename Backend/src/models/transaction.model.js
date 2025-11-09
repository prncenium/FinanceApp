//the digital receipt for every time one user sends money to another.

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    amount:{type:Number, required:true, min:[0.1, 'transaction should be min of 0.1']},
    status: {type: String, required: true, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'pending',},
    type: {type: String, required: true, enum: ['transfer', 'request'], default: 'transfer'}
}, {timestamps:true});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;