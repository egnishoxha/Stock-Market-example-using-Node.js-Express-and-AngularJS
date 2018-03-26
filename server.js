var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
/**************************** API functions *****************************************/
    //GET ALL list
    app.get('/getList', function(req, res){
        result=dataList;
        res.json(result);
    });  
/**************************** END API functions **************************************/

app.listen(process.env.PORT || 3000, function() {
  console.log('Node app is running on port', app.get('port'));
});





// DATA SAMPLE
var dataList=[
    {symbol: "GM",  open: 38.87},
    {symbol: "GE",  open: 25.40},
    {symbol: "MCD", open: 97.05},
    {symbol: "UAL", open: 69.45},
    {symbol: "WMT", open: 83.24},
    {symbol: "AAL", open: 55.76},
    {symbol: "LLY", open: 76.12},
    {symbol: "JPM", open: 61.75},
    {symbol: "BAC", open: 15.84},
    {symbol: "BA", open: 154.50}
];

