var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {clctProfileCompletion} = require('../models/profilecompletion' );

var UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    bio : {type: String},
    address : {type: String},
    pincode : {type: String},
    state : {type: String},
    country : {type: String},
    phone : {type: String},
    profileCompletion : {type: Number, default: 0}
},{ timestamps: true }

);

UserSchema.pre('save', function(){
    this.profileCompletion = clctProfileCompletion(this);

}) 

UserSchema.post('findOneAndUpdate', async function(doc){
    if(doc){
        const updatedCompletion = clctProfileCompletion(doc);
        doc.profileCompletion = updatedCompletion;
        await doc.save();
    
    }
    
});


module.exports = mongoose.model('User', UserSchema);