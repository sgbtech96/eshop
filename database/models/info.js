const mongoose = require('mongoose')
const info = mongoose.model('Item', {
	uid: {
		type: String
	},
	out_date: {
		type: String
	},
	category: {
		type: String
	},
	selling_price: {
		type: String
	}
})
module.exports = info