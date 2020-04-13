const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://sgbtech96:nptel@92@cluster0-hluvl.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
})