var mongoose = require('mongoose');
// var Customer = mongoose.model('Customer');
// var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = (function(){
  return{
    show: function(req, res){
      Product.find({}, function(err, results){
        if(err){
          console.log("error in finding products")
        }
        else if(results){
          res.json(results)
        }
      })
    },
    add: function(req, res){
      console.log("in controller", req.body)
      Product.findOne({name: req.body.name}, function(err, results){
        if(err){
          console.log("error in checking if product name already exists")
        }
        else if(results){
          res.json({errors: "Product by that name already exists"})
        }
        else{
          var product = new Product({name: req.body.name, inventory: req.body.quantity, url: req.body.url, description: req.body.description});
          product.save(function(err){
            if(err){
              res.json(err)
              console.log("Something went wrong in creating your product")
            }
            else {
              console.log('Your customer has been added')
              res.redirect('/')
            }
          })
        }
      })
    }
  }
})()
