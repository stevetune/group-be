document.querySelector('.burger').addEventListener('click', (e) => {
  	expandOrCollapseMenuSection(document.querySelector('.main-menu'))
});

document.querySelectorAll('.plus-minus').forEach(el => { 
  el.addEventListener('click', (e) => {
  	e.preventDefault()
  	let subMenu = el.closest('.main-menu--item-top').querySelector('.main-menu--submenu')
    expandOrCollapseMenuSection(subMenu, true)
  })
})

console.log('test')