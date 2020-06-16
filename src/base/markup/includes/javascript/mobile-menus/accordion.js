document.querySelector('.burger').addEventListener('click', (e) => {
  	expandOrCollapseMenuSection(document.querySelector('.main-menu'))
});

document.querySelectorAll('.main-menu--plus-button').forEach(el => { 
  el.addEventListener('click', (e) => {
    expandOrCollapseMenuSection(el.nextElementSibling, true)
  })
})