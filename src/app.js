//basic express set-up
const express = require('express')
const app = express()

//dynamic port
const port = process.env.PORT || 3000

//db connect
require('../database/connect')

//including the stock and sales models
const stock = require('../database/models/stock')
const sales = require('../database/models/sales')

//setting up dir structure
const path = require('path')
const hbs = require('hbs')
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

//setting up parsers
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json())

//CORS soln
app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

//main page
app.get('/', (req, res) => {
	res.render('index', {})
})

//sales page
app.get('/sales', (req, res) => {
	res.render('sales', {})
})

//stock page
app.get('/stock', (req, res) => {
	res.render('stock', {})
})

//stock entry
app.post('/stock/send', async (req, res) => {
	const model_no = req.body.model_no
	const old = await stock.findOneAndUpdate({model_no}, {
		$inc: {
			quantity: req.body.quantity
		}
	})
	if(old != undefined)
	{
		res.render('stock', {})
		return
	}
	const item = new stock(req.body)
	await item.save()
	res.render('stock', {})
})

//stock view
app.get('/stock/view',async (req, res) => {
	const quantity = req.query.quantity
	if(quantity != "none")
	{
		const short_items = await stock.find({quantity: { $lt:quantity }})
		res.send(short_items)
		return
	}
	const model_no = req.query.model_no
	const category = req.query.category
	const entry_date = req.query.entry_date
	var obj = {}
	if(model_no != "none")
		obj.model_no = model_no
	if(category != "none")
		obj.category = category
	if(entry_date != "none")
		obj.entry_date = entry_date
	const items = await stock.find(obj)
	res.send(items)
})

//sale entry
app.post('/sales/send', async (req, res) => {
	const model_no = req.body.model_no
	await stock.findOneAndUpdate({model_no}, {
		$inc: {
			quantity: -1
		}
	})
	const item = new sales(req.body)
	item.save().then(() => {
		res.render('sales', {});
	}).catch((e) => {
		res.send(e);
	})
})

//sales view
app.get('/sales/view', (req, res) => {
	const model_no = req.query.model_no
	const category = req.query.category
	const transaction_date = req.query.transaction_date
	var obj = {}
	if(model_no != "none")
		obj.model_no = model_no
	if(category != "none")
		obj.category = category
	if(transaction_date != "none")
		obj.transaction_date = transaction_date 
	sales.find(obj).then((items) => {
		res.send(items)
	}).catch((e) => {
		res.send(e)
	})
})


//listening at port
app.listen(port, () => {
	console.log('Server is up on port', port)
})