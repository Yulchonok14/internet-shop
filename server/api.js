var experss = require('express');
var router = experss.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;



const connection = function(closure) {
    return MongoClient.connect('mongodb://localhost:27017/internet_shop', function(err, db) {
        if(err) {
            return console.log(err);
        }
        closure(db);
    })
};

var response = {
    status: 200,
    message: null,
    data: []
};

var sendError = function(err, res) {
    response.status = 500;
    response.message = typeof err === 'object' ? err.message: err;
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json(response);
};

router.get('/products', function(req, res) {
    connection(function(db) {
        db.collection('products').find().toArray()
            .then(function(products) {
                response.data = products;
                res.json(response);
            })
            .catch(this.sendError);
    })
});

router.post('/product', function(req, res) {
    connection(function(db) {
        console.log('Connected');
        console.log('req.body: ', req.body);
        db.collection('products').insertOne(req.body)
            .then(function(product) {
                console.log('product: ', product);
                response.data = product;
                res.json(response);
            })
            .catch(this.sendError);
    })
});

router.put('/product', function(req, res) {
    connection(function(db) {
        console.log('Connected');
        db.collection('products').updateOne({'id': 1001}, {$set: req.body})
            .then(function(product) {
                console.log('product: ', product);
                response.data = product;
                res.json(response);
            })
            .catch(this.sendError);
    })
});

router.delete('/product', function(req, res) {
    connection(function(db) {
        console.log('Connected');
        db.collection('products').deleteOne(req.query)
            .then(function(product) {
                console.log('product: ', product);
                response.data = product;
                res.json(response);
            })
            .catch(this.sendError);
    })
});


module.exports = router;