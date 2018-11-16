const experss = require('express');
const router = experss.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const multer = require('multer');

var jsdom = require('jsdom');
const JSDOM = jsdom.JSDOM;
const window = new JSDOM().window;
const document = (new JSDOM('')).window.document;
global.document = document;

var $ = jQuery = require('jquery')(window);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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

router.get('/product', function(req, res) {
    connection(function(db) {
        db.collection('products').findOne({id : req.query.productId})
            .then(function(product) {
                response.data = product;
                res.json(response);
            })
            .catch(this.sendError);
    })
});

router.post('/product', upload.single('productImage'), function(req, res) {
    connection(function(db) {
        console.log('Connected');
        const newProd = {
            'name': req.body.productName,
            'id': req.body.productCode,
            'image': req.file.path,
            'description': req.body.productDescr,
            'price': req.body.productPrice
        };
        db.collection('products').insertOne(newProd)
            .then(function(product) {
                response.data = product;
                res.json(response);
            })
            .catch(this.sendError);
    })
});

router.put('/product', upload.single('productImage'), function(req, res) {
    connection(function(db) {
        console.log('Connected');
        console.log('req.body', req.body);
        const uptProd = {
            'name': req.body.productName,
            'id': req.body.productCode,
            'image': req.file.path,
            'description': req.body.productDescr,
            'price': req.body.productPrice
        };
        db.collection('products').updateOne({'id': uptProd.id}, {$set: uptProd})
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

router.get('/login', function(req, res) {
    connection(function(db) {
        db.collection('login').find().toArray()
            .then(function(login) {
                response.data = login;
                res.json(response);
            })
            .catch(this.sendError);
    })
});


module.exports = router;