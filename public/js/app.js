const myform = document.querySelector('form')
const view = document.querySelector('#view')
const table = document.querySelector('#show')
const inp = document.querySelector('input')
const category = document.querySelector('#category')
const date = document.querySelector('#date')

const addHead = (obj) => {
	var row = table.insertRow(0)
	const vals = Object.keys(obj)
	for(var i = 1; i < 5; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i].toUpperCase().bold()
	}
}

const addRow = (obj, n) => {
	var row = table.insertRow(n)
	const vals = Object.values(obj)
	for(var i = 1; i < 5; i++)
	{
		var cell = row.insertCell(i - 1)
		cell.innerHTML = vals[i]
	}
}

myform.addEventListener('submit', (e) => {
	msg1.innerHTML = "Updated successfully!"
})

inp.addEventListener('click', (e) => {
	table.innerHTML = ""
})

view.addEventListener('click', (e) => {
	table.innerHTML = "";
	console.log(category.value, date.value)
	const url = 'https://eshopkh.herokuapp.com/view?category=' + category.value + '&date=' + date.value
	console.log(url)
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