const mongoose = require('mongoose')
const schema = new mongoose.Schema({
	mdno: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	edt: {
		type: String
	},
	ett: {
		type: String
	},
	cat: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	qty: {
		type: Number,
		required: true
	},
	cp: {
		type: Number,
		required: true
	},
	mp: {
		type: Number,
		required: true
	},
	dinf: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	}
})

//#####Middleware to auto-fill: etd, ett, tt#####
schema.pre('save', function(next) {
	const item = this
	const today = new Date()
	item.edt = today.toString().substring(4, 15)
	item.ett = today.toString().substring(16, 21)
	next()
})


const stock = mongoose.model('stock', schema)
module.exports = stock