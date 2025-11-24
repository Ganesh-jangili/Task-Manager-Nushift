var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true}
},{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);