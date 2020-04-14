const mongoose = require('mongoose')
const stock = mongoose.model('stock', {
	model_no: {
		type: String,
		required: true
	},
	entry_date: {
		type: Date,
		required: true
	},
	entry_time: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	cost_price: {
		type: Number,
		required: true
	},
	marked_price: {
		type: Number,
		required: true
	},
	dealer_info: {
		type: String,
		required: true
	}
})
module.exports = stock