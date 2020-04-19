const mongoose = require('mongoose')

const category = mongoose.model('Category', {
	val: {
		type: String,
		trim: true,
		lowercase: true
	}
})

module.exports = category