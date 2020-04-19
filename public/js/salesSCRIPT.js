//#####SALES SCRIPT#####
const salfo = document.querySelector('form')
const wait = document.querySelector('#wait')
const viw = document.querySelector('#viw')
const stab = document.querySelector('#stab')
const scat = document.querySelector('#scat')
const sdt = document.querySelector('#sdt')
const smdno = document.querySelector('#smdno')
const par1 = document.querySelector('#par1')
const par2 = document.querySelector('#par2')
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
	const vals = ['Model_No', 'Told_Price', 'Selling_Price', 'Category', 'Transaction_Date', 'Transaction_Time']
	for(var i = 1; i < 7; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i - 1].bold()
	}
}

//#####Filling in values#####
const addRow = (obj, n) => {
	var row = stab.insertRow(1)
	const vals = Object.values(obj)
	for(var i = 1; i < 7; i++)
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
			})
		})
	})
}
ld()

res.addEventListener('click', (e) => {
	smdno.value = ''
	scat.value = 'none'
	sdt.value = ''
	stab.innerHTML = ''
	twait.innerHTML = ''
})
salfo.addEventListener('submit', (e) => {
	par1.innerHTML = ''
	par2.innerHTML = ''
	wait.innerHTML = 'Please wait....'
})


//#####View sales#####
viw.addEventListener('click', (e) => {
	twait.innerHTML = "Please wait...."
	stab.innerHTML = "";
	var m, d
	m = smdno.value
	if(m == '')
		m = "none"
	if(sdt.value.toString() == '')
		d = "none"
	else
		d = makeDate(sdt.value.toString())
	const url = '/sales/view?mdno=' + m + '&cat=' + scat.value + '&td=' + d
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
					i++;
				})
			}
			else {
				twait.innerHTML = 'No matches!'
			}
		})
	})
})