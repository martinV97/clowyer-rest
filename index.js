const express = require('express');
const routes = require('./routes/api');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const fs = require('fs');

const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.bcrypt = bcrypt;


mongoose.connect(process.env.MONGODB_URI||'mongodb://localHost/clowyer');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(routes);
app.use(express.static('public'))
app.use(function(err, req, res, next){
	console.log({error: err.message});
	res.send({
		error: err.message
	});
});
app.listen(process.env.PORT || 4000, function(){
	console.log('Esperando por request puerto 4000');
});