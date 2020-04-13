const express = require('express')
require('../database/connect')
const info = require('../database/models/info')
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000
const app = express()
var bodyParser = require("body-parser")
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/send', (req, res) => {
	const item = new info(req.body)
	item.save().then(() => {
		res.send(item);
	}).catch((e) => {
		res.send(e);
	})
})

app.get('/view', (req, res) => {
	info.find({}).then((items) => {
		res.send(items)
	}).catch((e) => {
		res.send(e)
	})
})

app.listen(port, () => {
	console.log('Server is up on port', port)
})