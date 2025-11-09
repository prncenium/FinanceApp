const Category = require('../models/category.model.js');

const createCategory = async (req,res) =>{
    try{
        const {name,type} = req.body;

        const userId = req.user;
        const category = new Category({user:userId, name, type});

        await category.save();
        res.status(201).json(category);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"server issue error"})
    }
};

const getCategory = async(req,res)=>{
    try{
        const userId = req.user;
        const categories = await Category.find({user:userId});

        res.status(200).json(categories);
    }
    catch(error){

    }
};

const updateCategory = async (req,res) =>{
    try{
        const {name,type} = req.body;

        const categoryId = req.params.id;
        const userId = req.user;
        const category = await Category.findById(categoryId);

        if(!category){
            res.status(404).json({msg:"category doesn't exist"});
        }

        //what if User A is Updating catorry of User B
        if(category.user.toString() !== userId){
            return res.status(401).json({msg:"User A , User B ki catroegy ko delete and update kr rha h"})
        }

        category.name = name;
        category.type = type;

        await category.save();
        res.status(200).json(category);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"server issue error"})
    }
};

const deleteCategory = async (req,res) =>{
    try{
        const categoryId = req.params.id;
        const userId = req.user;

        const category = await Category.findById(categoryId);

        if(!category){
            res.status(404).json({msg:"category doesn't exist"});
        }

        //what if User A is Updating catorry of User B
        if(category.user.toString() !== userId){
            return res.status(401).json({msg:"User A , User B ki catroegy ko delete and update kr rha h"})
        }
        await category.deleteOne();
        res.status(200).json({msg:"category deleted"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:"server issue error"})
    }
};


module.exports = {createCategory, getCategory, updateCategory, deleteCategory}
