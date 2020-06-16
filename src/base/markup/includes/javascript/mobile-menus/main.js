

const xBtn = document.querySelector(".x-button")
if(xBtn){
	document.querySelector(".x-button").onclick = () => {
		document.querySelector(".main-menu").classList.remove("is-visible")
		document.body.classList.remove("is-not-scrollable")
	}
}

document.querySelector(".burger").onclick = () => {
	document.querySelector(".main-menu").classList.toggle("is-visible")
	document.body.classList.add("is-not-scrollable")	
}