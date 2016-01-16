var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var OrderSchema = new mongoose.Schema({
  _customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  quantity: Number,
  placed: {type: Date, default: Date.now}
})

var Order = mongoose.model('Order', OrderSchema);
