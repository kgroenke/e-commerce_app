var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = (function(){
  return{
    add: function(req, res){
      console.log("in the orders controller!", req.body)
      var order = new Order({_customer: req.body.id, _product: req.body.product, quantity: req.body.quantity});
      order.save(function(err){
        if(err){
          console.log("error saving order")
        }
        else{
          Customer.findOne({_id: req.body.id}, function(err, customer){
            customer.orders.push(order)
            console.log(order)
            console.log(customer.orders)
            customer.save(function(err){
              if(err){
                console.log("Error, updating customer orders")
              }
              else{
                Product.findOne({_id: req.body.product}, function(err, product){
                  product.orders.push(order)
                  console.log(product)
                  console.log(product.orders)
                  product.save(function(err){
                    if(err){
                      console.log("Something went wrong updating product in order")
                    }
                    else{
                      console.log("neg quantity",(-1* req.body.quantity))
                        Product.update({_id: req.body.product}, { $inc: { inventory: (-1 * req.body.quantity) } }, function(err){
                          if(err){
                            console.log("something went wrong decreasing inventory")
                          }
                          else{
                            console.log("updated???")
                          }
                        });
                    }
                  })

                })
              }
            })
          })
        }
      })

      res.redirect('/')
    },
    show: function(req, res){
      console.log("in orders.js")
      Order.find({}).limit(30)
      .populate('_customer')
      .populate('_product')
      .exec(function(err, orders){
        console.log(orders)
        res.json(orders)
      })
    }
  }
})()
