var config = require('./config.js');

var express = require('express');
var app = express();

var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');

app.set('views', __dirname+"/views");
app.use(express.static(__dirname+"/views"));

var cors = require('cors');
app.use(cors());
app.options("*", cors());

var CASAuthentication = require('cas-authentication');
var cas = new CASAuthentication({
	cas_url         : 'https://cas.utc.fr/cas',
	service_url     : 'https://',
	cas_version     : '3.0',
	renew           : false,
	is_dev_mode     : false,
	dev_mode_user   : '',
	dev_mode_info   : {},
	session_name    : 'cas_user',
	session_info    : 'cas_userinfo',
	destroy_session : false
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", cas.bounce, function (req, res, err){
	res.render("index", {

	});
});

app.get("/admin", cas.block, function (req, res, err){
	res.render("admin", {

	});
});


app.get("/logout", cas.logout);

app.listen(9797, function(){
	console.log("Listening!");
});