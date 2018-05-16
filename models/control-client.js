var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseClientSchema = new Schema({
	caseNumber:{
		type: String,
		required: [true, 'Number case of CaseClient is required']
	},
	identificationClient:{
		type:String,
		required: [true, 'Identification client of CaseClient is required']
	}
});

const CaseClient = mongoose.model('caseClient', CaseClientSchema);
module.exports = CaseClient;