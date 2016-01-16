var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
]

var urlValidator = [
  validate({
    validator: 'isURL',
    message: 'URL must ve valid'
  })
]

var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
  name: {type: String, validate: nameValidator},
  inventory: {type: Number, required: true},
  created: {type: Date, default: Date.now},
  url: String,
  description: {type: String, reqired: true},
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
})

var Product = mongoose.model('Product', ProductSchema);
