//basic express set-up
const express = require('express')
const app = express()

//dynamic port
const port = process.env.PORT || 3000

//db connect
require('../database/connect')

//including the stock, categories and sales models
const stock = require('../database/models/stock')
const category = require('../database/models/categories')
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

app.get('/categories/view', async (req, res) => {
	try {
		const cats = await category.find({})
		res.send(cats)
	} catch(e) {

	}
	
})
//#####Stock entry#####
app.post('/stock/send', async (req, res) => {
	const mdno = req.body.mdno
	try {
		const old = await stock.findOneAndUpdate({mdno}, {
			$inc: {
				qty: req.body.qty
			},
			$set: {
				cp: req.body.cp,
				mp: req.body.mp
			}
		})
		if(old)
		{
			res.render('stock', {
				status: 'Quantity of item updated in stock successfully!'
			})
			return
		}
		const item = new stock(req.body)
		await item.save()
		var obj = {
			val: item.cat
		}
		const cat = new category(obj)
		await cat.save()
		res.render('stock', {
			status: 'Item added to stock successfully!'
		})
	} catch(e) {
		res.render('stock', {
			error: e
		})
	}
	
})

//#####Stock view#####
app.get('/stock/view', async (req, res) => {
	try {
		const qty = req.query.qty
		if(qty != "none")
		{
			const shitems = await stock.find({qty: { $lt:qty }})
			res.send(shitems)
			return
		}
		const mdno = req.query.mdno
		const cat = req.query.cat
		const edt = req.query.edt
		var obj = {}
		if(mdno != "none")
			obj.mdno = mdno
		if(cat != "none")
			obj.cat = cat
		if(edt != "none")
			obj.edt = edt
		const items = await stock.find(obj)
		res.send(items)
	} catch(e) {
		res.send(e)
	}
})

//#####Sale entry#####
app.post('/sales/send', async (req, res) => {

	//*****Decrement from stock*****
	const mdno = req.body.mdno
	const tp = req.body.tp
	const sp = req.body.sp
	try {
		const doc = await stock.findOne({mdno})
		//*****If not found in stock*****
		if(!doc) {
			res.render('sales', {
				error: "Item with Model_No: "+ mdno + " not found in stock!",
				status: ''
			})
			return
		}
		//*****Adding to sales*****
		if(doc.qty > 0) {
			doc.qty -= 1
			await doc.save()
		}
		else {
			res.render('sales', {
				error: "Item with Model_No: "+ mdno + " out of stock!",
				status: ''
			})
			return
		}
		req.body.cat = doc.cat
		const item = new sales(req.body)
		await item.save()
		res.render('sales', {
			status: 'Sales updated successfully!',
			error: ''
		})
	} catch(e) {

	}
})

//#####Sales view#####
app.get('/sales/view', async (req, res) => {

	//*****Applying filters*****
	const mdno = req.query.mdno
	const cat = req.query.cat
	const td = req.query.td
	var obj = {}
	if(mdno != "none")
		obj.mdno = mdno
	if(cat != "none")
		obj.cat = cat
	if(td != "none")
		obj.td = td

	//*****Searching with applied filters*****
	try {
		const items = await sales.find(obj)
		res.send(items)
	} catch(e) {
		res.send(e)
	}
})

//#####Listening at port#####
app.listen(port, () => {
	console.log('Server is up on port', port)
})