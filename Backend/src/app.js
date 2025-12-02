const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes.js')
const categoryRoutes = require('./routes/category.routes.js');
const expenseRoutes = require('./routes/expense.routes.js');
const transferRoutes = require('./routes/transfer.routes.js');
const budgetRoutes = require('./routes/budget.routes.js');
const goalRoutes = require('./routes/goal.routes.js');
const userRoutes = require('./routes/user.routes.js');

const app = express();

app.use(cors()); //for talking frontend with backend

app.use(helmet()); //just for security
app.use(express.json());

app.use(morgan('dev')); //not that imp, just helpful in debugging


app.get('/', (req,res)=>{
    res.status(200).json({msg:"Welcome to the app !!"})
})

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/expenses', expenseRoutes)
app.use('/api/v1/transfers', transferRoutes);
app.use('/api/v1/budgets', budgetRoutes);
app.use('/api/v1/goals', goalRoutes);
app.use('/api/v1/user', userRoutes);


module.exports = app;