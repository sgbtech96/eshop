//#####STOCK SCRIPT#####
const stofo = document.querySelector('form')
const viw = document.querySelector('#viw')
const scat = document.querySelector('#scat')
const sdt = document.querySelector('#sdt')
const stab = document.querySelector('#stab')
const smdno = document.querySelector('#smdno')
const sqty = document.querySelector('#sqty')
const par1 = document.querySelector('#par1')
const par2 = document.querySelector('#par2')
const wait = document.querySelector('#wait')
const twait = document.querySelector('#twait')
const res = document.querySelector('#res')

var month = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const makeDate = (temp) => {
	const y = temp.substring(0, 4)
	const m = temp.substring(5, 7)
	const d = temp.substring(8, 10)
	return (month[parseInt(m)] + ' ' + parseInt(d) + ' ' + y)
}

//#####Adding column names#####
const addHead = () => {
	var row = stab.insertRow(0)
	const vals = ['Model_No', 'Category', 'Quantity', 'Cost_Price', 'Marked_Price', 'Dealer_Info', 'Entry_Date', 'Entry_Time']
	for(var i = 1; i < 9; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i - 1].bold()
	}
}

//#####Filling in values
const addRow = (obj, n) => {
	var row = stab.insertRow(1)
	const vals = Object.values(obj)
	for(var i = 1; i < 9; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i]
	}
}

const ld = () => {
	fetch('/categories/view').then((res) => {
		res.json().then((data) => {
			scat.innerHTML = '<option value="none">none</option>'
			data.forEach((cat) => {
				scat.innerHTML += "<option value=\"" + cat.val + "\">" + cat.val + "</option>"
				console.log(scat.innerHTML)
			})
		})
	})
}
ld()

res.addEventListener('click', (e) => {
	smdno.value = ''
	scat.value = 'none'
	sdt.value = ''
	twait.innerHTML = ''
	stab.innerHTML = ''
})
stofo.addEventListener('submit', (e) => {
	par1.innerHTML = ''
	par2.innerHTML = ''
	wait.innerHTML = 'Please wait....'
})

//#####View stock#####
viw.addEventListener('click', (e) => {
	twait.innerHTML = 'Please wait....'
	stab.innerHTML = "";
	var m, d, q
	if(smdno.value == '')
		m = "none"
	else
		m = smdno.value
	if(sqty.value == '')
		q = "none"
	else
		q = sqty.value
	if(sdt.value.toString() == '')
		d = "none"
	else
		d = makeDate(sdt.value.toString())
	const url = '/stock/view?mdno=' + m + '&cat=' + scat.value + '&edt=' + d + '&qty=' + q
	console.log(url)
	fetch(url).then((res) => {
		res.json().then((data) => {
			if(data.length > 0)
			{
				twait.innerHTML = ''
				var i = 1
				addHead()
				data.forEach((item) => {
					addRow(item, i)
					i++
				})
			} else {
				twait.innerHTML = 'No matches!'
			}
		})
	})
})