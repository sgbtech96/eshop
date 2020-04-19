const mongoose = require('mongoose')
var schema = new mongoose.Schema({
	mdno: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	td: {
		type: String
	},
	tt: {
		type: String
	},
	cat: {
		type: String
	},
	tp: {
		type: Number,
		required: true
	},
	sp: {
		type: Number,
		required: true
	}
})

//#####Middleware to auto-fill: td, tt#####
schema.pre('save', function (next) {
	const item = this
	const mdno = item.mdno
	const today = new Date()
	item.td = today.toString().substring(4, 15)
	item.tt = today.toString().substring(16, 21)
	next()	
})

const sales = mongoose.model('sales', schema)
module.exports = sales