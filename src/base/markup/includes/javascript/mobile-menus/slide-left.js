document.querySelector(".main-menu--item.has-submenu").onclick = (e) => {
	e.preventDefault()
	document.querySelector(".main-menu").classList.add("is-show-right")
}

document.querySelector(".main-menu--back-btn").onclick = (e) => {
	e.preventDefault()
	e.stopPropagation()
	document.querySelector(".main-menu").classList.remove("is-show-right")
}