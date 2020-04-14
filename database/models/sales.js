const mongoose = require('mongoose')
const sales = mongoose.model('sales', {
	model_no: {
		type: String,
		required: true
	},
	transaction_date: {
		type: Date,
		required: true
	},
	transaction_time: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	told_price: {
		type: Number,
		required: true
	},
	selling_price: {
		type: Number,
		required: true
	}
})
module.exports = sales