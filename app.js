var config = require('./config.js');

var express = require('express');
var app = express();

var mustache = require('mustache-exprss');
app.engine('html', mustache());
app.set('view engine', 'html');

app.set('views', __dirname+"/views");
app.use(express.static(__dirname+"/views"));

var cors = require('cors');
app.use(cors());
app.options("*", cors());


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res, err){
	res.render("index", {

	});
});

app.get("/admin", function (req, res, err){
	res.render("admin", {

	});
});

app.listen(9797, function(){
	console.log("Listening!");
});