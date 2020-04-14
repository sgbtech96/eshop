const view = document.querySelector('#view')
const table = document.querySelector('#show')
const inp = document.querySelector('input')
const category = document.querySelector('#category')
const date = document.querySelector('#date')
const tt = document.querySelector('#tt')

const addHead = (obj) => {
	var row = table.insertRow(0)
	const vals = Object.keys(obj)
	for(var i = 1; i < 7; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i].toUpperCase().bold()
	}
}

const addRow = (obj, n) => {
	var row = table.insertRow(n)
	const vals = Object.values(obj)
	for(var i = 1; i < 7; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i]
	}
}

tt.addEventListener('click', (e) => {
	var today = new Date()
	var time = today.getHours() + ":" + today.getMinutes()
	tt.value = time
})

inp.addEventListener('click', (e) => {
	table.innerHTML = ""
})

view.addEventListener('click', (e) => {
	table.innerHTML = "";
	var d
	if(date.value.length == 0)
		d = "none"
	else
		d = date.value
	const url = '/sales/view?category=' + category.value + '&transaction_date=' + d
	fetch(url).then((res) => {
		res.json().then((data) => {
			if(data.length > 0)
			{
				var i = 1
				addHead(data[0])
				data.forEach((item) => {
					addRow(item, i)
					i++
				})
			}
			
		})
	})
})