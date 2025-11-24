const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const User = require('../models/User');

//.............................................................................
//to create a task for a user
//url :/createTask
router.post('/createTask', async(req, res)=>{
    try{
        const {title, description, status, userId} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        const newTask  = await Task.create({title, description, status, userId});
        return res.status(201).json({message: 'Task created successfully', task: newTask});
    }
    catch(err){
        return res.status(500).json({error: 'Internal Server Error', details: err.message});
    }

});
//.............................................................................
//to get tasks of a user
//url :/getTasks/:userId
router.get('/getTasks/:userId', async(req, res)=>{
    try{
        const userId = req.params.userId;
        const filtered={}
        if(userId){
            filtered.userId=userId
        }
        const tasks = await Task.find(filtered).populate('userId', 'name');
        return res.json({tasks});

        

    }
    catch(err){
        return res.status(500).json({error: 'Internal Server Error', details: err.message});
    }
});
//.............................................................................
//to get one task by task id
//url :/getTask/:taskId
router.get('/getTask/:taskId', async(req, res)=>{
    try{
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId).populate('userId', 'name');
        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }
        return res.json({task});
    }
    catch(err){
        return res.status(500).json({error: 'Internal Server Error', details: err.message});
    }
});
//.............................................................................
//to update a task by task id
//url :/updateTask/:taskId
router.patch('/updateTask/:taskId', async(req, res)=>{
    try{
        const taskId = req.params.taskId;
        const updateData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {new: true, runValidators: true});
        if(!updatedTask){
            return res.status(404).json({error: 'Task not found'});
        }
        return res.json({message: 'Task updated successfully', task: updatedTask});
    }
    catch(err){
        return res.status(500).json({error: 'Internal Server Error', details: err.message});
    }
});
//.............................................................................
//to delete a task by task id
//url :/deleteTask/:taskId
router.delete('/deleteTask/:taskId', async(req, res)=>{
    try{
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if(!deletedTask){
            return res.status(404).json({error: 'Task not found'});
        }
        return res.json({message: 'Task deleted successfully'});
    }
    catch(err){
        return res.status(500).json({error: 'Internal Server Error', details: err.message});
    }
});

module.exports = router;
