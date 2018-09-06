# Product Catalog Search - Elastic Search

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:5050/`.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Steps to run project
1. Load mongodb dump file present in folder `sample-data/products` into mongodb.
2. Fire up elasticsearch cluster(follow the instructions on elastic search website to install elastic search locally).
3. Set mappings before loading the data in elastic search using mappings present `sample-data/mappings.json` folder.
4. Run script `loadDocsToESCluster.js` present in `sample-data` folder using command `node sample-data/loadDocsToESCluster.js`.
5. Once the script is done loading data into ES cluster, run the command `npm start`.
6. Once the server is running, you can input different queries to experience the efficiency & accuracy of elastic search. Following are few sample queries you can try:
- black shirt size s
- yellow dress 
- mens shoes size 10
