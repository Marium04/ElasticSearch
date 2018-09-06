/**
 * Created by mariumaskri on 2017-04-19.
 */
const express = require('express');
const router = express.Router();
const _ = require('underscore');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
router.get('/:searchString',function(req,res) {
  console.log(req.params);
  var searchString = req.params.searchString;
  fetchResults(searchString,function(error,results){
    res.json(results.data);
  });
});
router.post('/',function(req,res) {
  console.log(req.body);
  var searchString = req.body.searchString;
  fetchResults(searchString,function(error,results){
    res.json(results);
  });
});
fetchResults = function(searchString,callback){
  if(new RegExp('size','gi').test(searchString)){
    var sizeIndex = searchString.toLowerCase().indexOf('size');
    searchString = searchString.substr(0,sizeIndex).replace(/\s+/g,' ').trim().replace(/\s|\b$/g, '~ ')+"Size:"+searchString.substr(sizeIndex+4).replace(/\s+/g,' ').trim().replace(/\s|\b$/g, '~ ');
  }
  else {
    searchString = searchString.replace(/\s+/g,' ').trim().replace(/\s|\b$/g, '~ ')
  }
  client.search({
    index: 'products',
    type: 'women',
    body: {
      size:12,
      query: /*{
       match: {
       _all: {
       query: req.params.searchString,
       operator : "and",
       fuzziness: "AUTO"
       }
       }
       }*/{
        "query_string": {
          "default_field": "custom_all",
          "query": searchString,
          "boost": 2,
          "default_operator": "AND",
          "lenient": true,
          "auto_generate_phrase_queries": true,
          "split_on_whitespace": true,
          fuzziness: "AUTO"
        }
      }
    }
  }).then(function (resp) {
    var hits = resp.hits.hits;
    callback(null,{data:_.pluck(hits,'_source'),total:resp.hits.total});
  }, function (err) {

    callback(err,null);
  });
};


module.exports = router;






