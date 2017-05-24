
/*var ElasticsearchCSV = require('elasticsearch-csv');

// create an instance of the importer with options
var esCSV = new ElasticsearchCSV({
    es: { index: 'products', type: 'women', host: '127.0.0.1:9200' },
    csv: { filePath: '<path-to-csv-file>', headers: true }
});

esCSV.import()
    .then(function (response) {
        // Elasticsearch response for the bulk insert
        console.log(response);
    }, function (err) {
        // throw error
        throw err;
    });*/


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
            index: '<index_name>',
            type: '<type>',
            collection: '<mongoCollectionName>',
            preseveIds: true
        }, function (err) {
            if (!err)
                console.log("done adding docs");
        });
});
