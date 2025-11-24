var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//.............................................................................
router.post('/createUser', async(req, res)=>{
  try{
    console.log(req.body);
    const {name, email, password, bio, address, pincode, state, country, phone} = req.body;
    hashedpass = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      name, email, password:hashedpass, bio, address, pincode, state, country, phone
    });
    return res.json({message: 'User created successfully', user: newUser});
    
  }
  catch(err){
    console.log(err);
    return  res.status(500).json({error: 'Internal Server Error', details: err.message});
  }
});
//.............................................................................
//to get users by id
//url :/users/getUser/:id
router.get('/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    return res.json({user});
  }
  catch(err){
    return res.status(500).json({error: 'Internal Server Error', details: err.message});
  }
});
//.............................................................................
//to update user by id
//url :/users/updateUser/:id
router.patch('/updateUser/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true, runValidators: true});
    if(!updatedUser){
      return res.status(404).json({error: 'User not found'});
    }
    return res.json({message: 'User updated successfully', user: updatedUser});
  }
  catch(err){
    return res.status(500).json({error: 'Internal Server Error', details: err.message});
  }
});

//.............................................................................
//to get profile completion of user by id
//url :/ProfileCompletion/:id
router.get('/ProfileCompletion/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    return res.json({profileCompletion: user.profileCompletion});
  }
  catch(err){
    return res.status(500).json({error: 'Internal Server Error', details: err.message});
  }
});








module.exports = router;
