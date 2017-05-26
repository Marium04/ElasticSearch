var MongoClient = require('mongodb').MongoClient;
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
// Connection URL
var url = 'mongodb://localhost:27017/products';
MongoClient.connect(url, function(err, db) {
    if (err)
        return res.send({errorMessage: err});
    else
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
