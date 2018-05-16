const express = require('express');
const router = express.Router();
const conString = process.env.DATABASE_URL;
const Lawyer = require('../models/lawyer');
const ControlLawyer = require('../models/control-lawyer');
const Case = require('../models/case');
const Document = require('../models/document');
const Court = require('../models/court');
const ControlClient = require('../models/control-client');
const Client = require('../models/client');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var path = require("path");
//-----------------------------------------Lawyer----------------------------------------------

router.get('/lawyer', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

/*router.get('/Lawyer/:name', function(req, res, next) {
	Lawyer.find({name: req.params.name}).then(function(Lawyers){
		res.send(Lawyers);
	});
});*/

router.get('/lawyer/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.send(Lawyer);
	});

});

router.post('/lawyer', function(req, res, next) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  		req.body.password = hash;
		Lawyer.create(req.body).then(function(Lawyer){
			console.log('success');
		}).catch(next);
	});
});

router.post('/lawyer-web', function(req, res, next) {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  		req.body.password = hash;
		Lawyer.create(req.body).then(function(Lawyer){
			res.sendFile('main.html', {root: 'public'});
			console.log('success');
		}).catch(next);
	});
});

router.delete('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.send({Lawyer});
	});
});

router.put('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.send(Lawyer);
		});
	});
});
//-----------------------------------------ControlLawyer----------------------------------------------

router.get('/controlLawyer', function(req, res, next) {
	ControlLawyer.find({}).then(function(ControlLawyer){
		res.send(ControlLawyer);
	});
});

/*router.get('/Lawyer/:name', function(req, res, next) {
	Lawyer.find({name: req.params.name}).then(function(Lawyers){
		res.send(Lawyers);
	});
});*/

router.get('/controlLawyer/:caseNumber', function(req, res, next) {
	ControlLawyer.find({caseNumber: req.params.caseNumber}).then(function(ControlLawyer){
		res.send(ControlLawyer);
	});
});

router.post('/controlLawyer', function(req, res, next) {
	ControlLawyer.create(req.body).then(function(ControlLawyer){
		res.send(ControlLawyer);
	}).catch(next);
});

router.delete('/controlLawyer/:id', function(req, res, next){
	ControlLawyer.findByIdAndRemove({_id: req.params.id}).then(function(ControlLawyer){
		 res.send({ControlLawyer});
	});
});

router.put('/controlLawyer/:id', function(req, res, next){
	ControlLawyer.findByIdAndUpdate({_id:req.params.id}).then(function(ControlLawyer){
		ControlLawyer.findOne({_id:req.params.id}).then(function(ControlLawyer){
			res.send(ControlLawyer);
		});
	});
});

//----------------------------------------Case-----------------------------------------------
router.get('/case', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.send(Case);
	});
});

router.get('/case/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.send(Case);
	});

});

router.post('/case', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.send(Case);
	}).catch(next);
});

router.delete('/case/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.send({Case});
	});
});

router.put('/case/:id', function(req, res, next){
	Case.findByIdAndUpdate({_id:req.params.id}).then(function(Case){
		Case.findOne({_id:req.params.id}).then(function(Case){
			res.send(Case);
		});
	});
});

//-----------------------------------------Document------------------------------------------------
router.get('/document', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.send(Document);
	});
});

router.get('/document/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.send(Document);
	});
});

/*router.get('/Document/:id', function(req, res, next) {
	Document.findById(req.params.id).then(function(Document){
		res.send(Document);
	});
});*/

router.post('/document', function(req, res, next) {
	Document.create(req.body).then(function(Document){
		res.send(Document);
	}).catch(next);
});

router.delete('/document/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		 res.send({Document});
	});
});

router.put('/document/:id', function(req, res, next){
	Document.findByIdAndUpdate({_id:req.params.id}).then(function(Document){
		Document.findOne({_id:req.params.id}).then(function(Document){
			res.send(Document);
		});
	});
});
//-----------------------------------------Court------------------------------------------------
router.get('/court', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.send(Court);
	});
});

router.get('/court/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.send(Court);
	});
});

/*router.get('/Document/:id', function(req, res, next) {
	Document.findById(req.params.id).then(function(Document){
		res.send(Document);
	});
});*/

router.post('/court', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.send(Court);
	}).catch(next);
});

router.delete('/court/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.send({Court});
	});
});

router.put('/court/:id', function(req, res, next){
	Court.findByIdAndUpdate({_id:req.params.id}).then(function(Court){
		Court.findOne({_id:req.params.id}).then(function(Court){
			res.send(Court);
		});
	});
});

//-----------------------------------------ControlClient------------------------------------------------
router.get('/controlClient', function(req, res, next) {
	ControlClient.find({}).then(function(ControlClient){
		res.send(ControlClient);
	});
});

router.get('/controlClient/:caseNumber', function(req, res, next) {
	ControlClient.find({caseNumber: req.params.caseNumber}).then(function(ControlClient){
		res.send(ControlClient);
	});
});

/*router.get('/Document/:id', function(req, res, next) {
	Document.findById(req.params.id).then(function(Document){
		res.send(Document);
	});
});*/

router.post('/controlClient', function(req, res, next) {
	ControlClient.create(req.body).then(function(ControlClient){
		res.send(ControlClient);
	}).catch(next);
});

router.delete('/controlClient/:id', function(req, res, next){
	ControlClient.findByIdAndRemove({_id: req.params.id}).then(function(ControlClient){
		 res.send({ControlClient});
	});
});

router.put('/controlClient/:id', function(req, res, next){
	ControlClient.findByIdAndUpdate({_id:req.params.id}).then(function(ControlClient){
		ControlClient.findOne({_id:req.params.id}).then(function(ControlClient){
			res.send(ControlClient);
		});
	});
});

//-----------------------------------------Client------------------------------------------------

router.get('/client', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.send(Client);
	});
});

/*router.get('/Lawyer/:name', function(req, res, next) {
	Lawyer.find({name: req.params.name}).then(function(Lawyers){
		res.send(Lawyers);
	});
});*/

router.get('/client/:identification', function(req, res, next) {
	Client.find({identification: req.params.identification}).then(function(Client){
		res.send(Client);
	});

});

router.post('/client', function(req, res, next) {
	Client.create(req.body).then(function(Client){
		res.send(Client);
	}).catch(next);
});

router.delete('/client/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		 res.send({Client});
	});
});

router.put('/client/:id', function(req, res, next){
	Client.findByIdAndUpdate({_id:req.params.id}).then(function(Client){
		Client.findOne({_id:req.params.id}).then(function(Client){
			res.send(Client);
		});
	});
});

module.exports = router;