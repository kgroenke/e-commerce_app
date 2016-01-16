var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
]


var Schema = mongoose.Schema;
var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: true, validate: nameValidator},
  created: {type: Date, default: Date.now},
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

var Customer = mongoose.model('Customer', CustomerSchema);
