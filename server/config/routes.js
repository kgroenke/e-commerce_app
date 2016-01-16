var customers = require('./../controllers/customers.js');
var orders = require('./../controllers/orders.js');
var products = require('./../controllers/products.js');

module.exports = function(app){
  app.post('/customer/add', function(req, res){
    customers.add(req, res);
  })

  app.get('/customers', function(req, res){
    customers.show(req, res);
  })

  app.post('/customer/destroy/:id', function(req, res){
    customers.destroy(req, res);
  })

  app.post('/product/add', function(req, res){
    products.add(req, res);
  })

  app.get('/products', function(req, res){
    products.show(req, res);
  })

  app.post('/order/add', function(req, res){
    console.log(req.body);
    orders.add(req, res);
  })

  app.get('/orders', function(req, res){
    orders.show(req, res);
  })
}
