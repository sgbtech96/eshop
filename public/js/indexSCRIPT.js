const bt1 = document.querySelector('#bt1')
const bt2 = document.querySelector('#bt2')
const bt3 = document.querySelector('#bt3')

bt1.addEventListener('click', (e) => {
	location.href = "/stock"
})

bt2.addEventListener('click', (e) => {
	location.href = "/sales"
})

bt3.addEventListener('click', (e) => {
	location.href = "/"
})