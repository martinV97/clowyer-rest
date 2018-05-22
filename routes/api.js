const express = require('express');
const router = express.Router();
const conString = process.env.DATABASE_URL;
const Lawyer = require('../models/lawyer');
const Case = require('../models/case');
const Document = require('../models/document');
const Court = require('../models/court');
const Client = require('../models/client');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

//------------------------------------Navigation - web-----------------------------------------
router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/login-lawyer-web', function(req, res, next) {
	if(next){
		Lawyer.findOne({email: req.body.email}).then(function(Lawyer){
		bcrypt.compare(req.body.password, Lawyer.password, function(err, result) {
			if(err){
				res.redirect('/login');
			}
			if(result){
				req.session.lawyer = Lawyer;
				res.redirect('/main');
			}else{
				res.redirect('/login');
			}
			});
		});
	}else{
		
	}
});

router.get('/login', function(req, res, next) {
	if(req.session.lawyer != null){
    	res.redirect('/main');
    }else{
    	res.render('login');
    }
});

router.get('/register', function(req, res, next) {
	res.render('register');
});

router.get('/main', function(req, res, next) {
	var cases = "";
	var clients;
	var courts;
    if(req.session.lawyer != null){
    	Case.find({idLawyer: req.session.lawyer._id}).then(function(Case){
    		cases = Case;
		});
		Client.find({idLawyer: req.session.lawyer._id}).then(function(Client){
    		clients = Client;
		});
		Court.find({idLawyer: req.session.lawyer._id}).then(function(Court){
    		courts = Court;
		});
		console.log(cases);
		res.render('main',{cases: cases, clients: clients, courts: courts});
    }else{
    	res.redirect('/');
    }
});

router.get('/exit', function(req, res, next) {
	req.session.lawyer = null;
	res.redirect('/');
});


//-----------------------------------------Lawyer----------------------------------------------

router.get('/lawyer', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});
});

router.get('/lawyer-web', function(req, res, next) {
	Lawyer.find({}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.get('/lawyer/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.json({'Lawyer' : Lawyer});
	});

});

router.get('/lawyer-web/:identification', function(req, res, next) {
	Lawyer.find({identification: req.params.identification}).then(function(Lawyer){
		res.send(Lawyer);
	});
});

router.post('/lawyer', function(req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		res.send('Success');
		console.log('success');
	}).catch(next);
});

router.post('/lawyer-web', function(req, res, next) {
    req.body.password = bcrypt.hashSync(req.body.password);
	Lawyer.create(req.body).then(function(Lawyer){
		req.session.lawyer = Lawyer;
		res.redirect('/main');
	}).catch(next);
});

router.delete('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.send({Lawyer});
	});
});

router.delete('/lawyer-web/:id', function(req, res, next){
	Lawyer.findByIdAndRemove({_id: req.params.id}).then(function(Lawyer){
		 res.redirect('/main');
	});
});

router.put('/lawyer/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.send(Lawyer);
		});
	});
});

router.put('/lawyer-web/:id', function(req, res, next){
	Lawyer.findByIdAndUpdate({_id:req.params.id}).then(function(Lawyer){
		Lawyer.findOne({_id:req.params.id}).then(function(Lawyer){
			res.redirect('/main');
		});
	});
});

//----------------------------------------Case-----------------------------------------------
router.get('/case', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.get('/case-web', function(req, res, next) {
	Case.find({}).then(function(Case){
		res.send(Case);
	});
});

router.get('/case/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.json({'Case' : Case});
	});
});

router.get('/case-web/:id', function(req, res, next) {
	Case.findById(req.params.id).then(function(Case){
		res.send(Case);
	});
});

router.post('/case', function(req, res, next) {
	Case.create(req.body).then(function(Case){
		res.send(Case);
	}).catch(next);
});

router.post('/case-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Case.create(req.body).then(function(Case){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/case/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.send({Case});
	});
});

router.delete('/case-web/:id', function(req, res, next){
	Case.findByIdAndRemove({_id: req.params.id}).then(function(Case){
		 res.redirect('/main');
	});
});

router.put('/case/:id', function(req, res, next){
	Case.findByIdAndUpdate({_id:req.params.id}).then(function(Case){
		Case.findOne({_id:req.params.id}).then(function(Case){
			res.send(Case);
		});
	});
});

router.put('/case-web/:id', function(req, res, next){
	Case.findByIdAndUpdate({_id:req.params.id}).then(function(Case){
		Case.findOne({_id:req.params.id}).then(function(Case){
			res.redirect('/main');
		});
	});
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
//-----------------------------------------Court------------------------------------------------
router.get('/court', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web', function(req, res, next) {
	Court.find({}).then(function(Court){
		res.send(Court);
	});
});

router.get('/court/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.json({'Court' : Court});
	});
});

router.get('/court-web/:id', function(req, res, next) {
	Court.findById({id: req.params.id}).then(function(Court){
		res.send(Court);
	});
});

router.post('/court', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.send(Court);
	}).catch(next);
});

router.post('/court-web', function(req, res, next) {
	Court.create(req.body).then(function(Court){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/court/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.send({Court});
	});
});

router.delete('/court-web/:id', function(req, res, next){
	Court.findByIdAndRemove({_id: req.params.id}).then(function(Court){
		 res.redirect('/main');
	});
});

router.put('/court/:id', function(req, res, next){
	Court.findByIdAndUpdate({_id:req.params.id}).then(function(Court){
		Court.findOne({_id:req.params.id}).then(function(Court){
			res.send(Court);
		});
	});
});

router.put('/court-web/:id', function(req, res, next){
	Court.findByIdAndUpdate({_id:req.params.id}).then(function(Court){
		Court.findOne({_id:req.params.id}).then(function(Court){
			res.redirect('/main');
		});
	});
});

//-----------------------------------------Client------------------------------------------------

router.get('/client', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.json({'Client' : Client});
	});
});

router.get('/client-web', function(req, res, next) {
	Client.find({}).then(function(Client){
		res.send(Client);
	});
});

router.get('/client/:idLawyer', function(req, res, next) {
	Client.find({idLawyer: req.params.idLawyer}).then(function(Client){
		res.json({'Client' : Client});
	});

});

router.get('/client-web/:idLawyer', function(req, res, next) {
	Client.find({idLawyer: req.params.idLawyer}).then(function(Client){
		res.send(Client);
	});

});

router.post('/client', function(req, res, next) {
	Client.create(req.body).then(function(Client){
		res.send(Client);
	}).catch(next);
});

router.post('/client-web', function(req, res, next) {
	req.body.idLawyer = req.session.lawyer._id;
	Client.create(req.body).then(function(Client){
		res.redirect('/main');
	}).catch(next);
});

router.delete('/client/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		 res.send({Client});
	});
});

router.delete('/client-web/:id', function(req, res, next){
	Client.findByIdAndRemove({_id: req.params.id}).then(function(Client){
		 res.redirect('/main');
	});
});

router.put('/client/:id', function(req, res, next){
	Client.findByIdAndUpdate({_id:req.params.id}).then(function(Client){
		Client.findOne({_id:req.params.id}).then(function(Client){
			res.send(Client);
		});
	});
});

router.put('/client-web/:id', function(req, res, next){
	Client.findByIdAndUpdate({_id:req.params.id}).then(function(Client){
		Client.findOne({_id:req.params.id}).then(function(Client){
			res.redirect('/main');
		});
	});
});

module.exports = router;