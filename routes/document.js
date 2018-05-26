const express = require('express');
const Document = require('../models/document');
const path = require('path');
const fs = require('fs');
var util = require('util')
var multer = require('multer')({
   dest: 'public/uploads'
});

const router = express.Router();

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'clowyer', 
  api_key: '482155296382456', 
  api_secret: '5zctAUOvaqtHgxbS_RwAfv5DTJ0' 
});

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

router.post('/document-web-main', [multer.single('url')], function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
	cloudinary.uploader.upload('public/uploads/' + req.file.originalname,
		{ resource_type: "raw" },
		function(result) { 
		req.body.url = result.secure_url;
		fs.unlinkSync('public/uploads/' + req.file.originalname);
		Document.create(req.body).then(function(Document){
			res.redirect('/main');
		}).catch(next);
	});
});

router.post('/document-web-case', [multer.single('url')], function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	storeWithOriginalName(req.file).then(encodeURIComponent).then(encoded => {}).catch(next);
	cloudinary.uploader.upload('public/uploads/' + req.file.originalname,
		{ resource_type: "raw" },
		function(result) { 
		req.body.url = result.secure_url;
		fs.unlinkSync('public/uploads/' + req.file.originalname);
		Document.create(req.body).then(function(Document){
			res.redirect('/case');
		}).catch(next);
	});
});

function storeWithOriginalName (file) {
  var fullNewPath = path.join(file.destination, file.originalname)
  var rename = util.promisify(fs.rename)
  return rename(file.path, fullNewPath)
    .then(() => {
      return file.originalname
    })
}

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