const form = document.querySelector('form')
const view = document.querySelector('#view')
const para = document.querySelector('#show')

view.addEventListener('click', (e) => {
	para.innerHTML = "";
	fetch('/view').then((res) => {
		res.json().then((data) => {
			var i = 0
			data.forEach((item) => {
				i++
				para.innerHTML += "Sno = " + i + "<br>uid = " + item.uid + "<br>out_date = " + item.out_date + "<br>category = " + item.category + "<br>selling_price = " + item.selling_price
				para.innerHTML += "<hr>"
			})
		})
	})
})