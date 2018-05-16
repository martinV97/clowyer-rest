var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CaseLawyerSchema = new Schema({
	caseNumber:{
		type: String,
		required: [true, 'Number case of CaseLawyer is required']
	},
	identificationLawyer:{
		type:String,
		required: [true, 'Identification lawyer of CaseLawyer is required']
	}
});

const CaseLawyer = mongoose.model('caseLawyer', CaseLawyerSchema);
module.exports = CaseLawyer;