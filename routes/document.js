const express = require('express');
const Document = require('../models/document');

const router = express.Router();

//-----------------------------------------Document------------------------------------------------
router.get('/document', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web', function(req, res, next) {
	Document.find({}).then(function(Document){
		res.send(Document);
	});
});

router.get('/document/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.json({'Document' : Document});
	});
});

router.get('/document-web/:caseNumber', function(req, res, next) {
	Document.find({caseNumber: req.params.caseNumber}).then(function(Document){
		res.send(Document);
	});
});

router.post('/document', function(req, res, next) {
	Document.create(req.body).then(function(Document){
		res.send(Document);
	}).catch(next);
});

router.post('/document-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Document.create(req.body).then(function(Document){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/document/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		 res.send({Document});
	});
});

router.delete('/document-web/:id', function(req, res, next){
	Document.findByIdAndRemove({_id: req.params.id}).then(function(Document){
		 res.redirect('/main');
	});
});

router.put('/document/:id', function(req, res, next){
	Document.findByIdAndUpdate({_id:req.params.id}).then(function(Document){
		Document.findOne({_id:req.params.id}).then(function(Document){
			res.send(Document);
		});
	});
});

router.put('/document-web/:id', function(req, res, next){
	Document.findByIdAndUpdate({_id:req.params.id}).then(function(Document){
		Document.findOne({_id:req.params.id}).then(function(Document){
			res.redirect('/main');
		});
	});
});

module.exports = router;