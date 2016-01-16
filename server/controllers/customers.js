var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
// var Order = mongoose.model('Order');
// var Product = mongoose.model('Product');

module.exports = (function(){
  return{
    show: function(req, res){
      Customer.find({}, function(err, results){
        if(err){
          console.log("error in finding customers")
        }
        else if(results){
          res.json(results)
        }
      })
    },
    add: function(req, res){
      Customer.findOne({name: req.body.name}, function(err, results){
        if(err){
          console.log("error in checking findone")
        }
        else if(results){
          res.json({errors: "Customer already exists"})
        }
        else{
          var customer = new Customer({name: req.body.name});
          customer.save(function(err){
            if (err){
              // this is where we get the mongoose validator errors
              console.log("error", err)
              res.json(err)
              console.log("Something went wrong in creating your customer")
            }
            else {
              console.log('Your customer has been added')
              res.redirect('/')
            }
          })
        }
      })
    },
    destroy: function(req, res){
      console.log("in the controller", req.params.id)
      Customer.remove({_id: req.params.id}, function(err){
        if(err){
          console.log('Something went wrong deleting your customer')
        }
        else{
          console.log("your customer has been deleted.")
          res.redirect('/')
        }
      })
    }

  }
})()
