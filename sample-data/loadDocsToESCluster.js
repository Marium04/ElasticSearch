var MongoClient = require('mongodb').MongoClient;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});
// Connection URL
var url = 'mongodb://localhost:27017/products';
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, mongodbClient) {
    if (err)
        return res.send({errorMessage: err});
    else
        var db = mongodbClient.db("products");
        var mongoElasticTransfer = require('mongo-elastic-transfer');
        mongoElasticTransfer.transfer({
            esClient: client,
            mClient: db,
            index: 'products',
            type: 'women',
            collection: 'women',
            preseveIds: true
        }, function (err) {
            if (!err)
                console.log("done adding docs");
        });
});
