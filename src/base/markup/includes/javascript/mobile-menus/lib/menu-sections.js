const collapseMenuSection = (element, isInner = false) => {
    let menuSectionHeight = element.scrollHeight;
    let elementTransition = element.style.transition;
    element.style.transition = '';
  
    requestAnimationFrame(() => {
      element.style.height = `${menuSectionHeight}px`;
      element.style.transition = elementTransition;

      requestAnimationFrame(() => {
        element.style.height = '0px';  
      });
    });
  
  if(isInner){
    let mm = document.querySelector('.main-menu')
    mm.style.height = `${mm.scrollHeight - menuSectionHeight}px`
  }
  
  element.setAttribute('data-collapsed', 'true');
}

const expandMenuSection = (element, isInner = false) => {
    
    let menuSectionHeight = element.scrollHeight;
    element.style.height = `${menuSectionHeight}px`;

    if(isInner){
      let mm = document.querySelector('.main-menu')
      mm.style.height = `${mm.scrollHeight + menuSectionHeight}px`
    }
  
    element.setAttribute('data-collapsed', 'false');
}

const expandOrCollapseMenuSection = (element, isInner) => {
  let isCollapsed = element.getAttribute('data-collapsed') === 'true';
  console.log(isCollapsed)

  if(isCollapsed) { 
    expandMenuSection(element, isInner)
    element.setAttribute('data-collapsed', 'false') 
  } else {
    collapseMenuSection(element, isInner) 
  }
}


//add/remove on resize
let menu = document.querySelector('.main-menu.is-collapsible');
menu.setAttribute('data-collapsed', 'true');
menu.style.height =  window.innerWidth > 900 ? 'initial': '0px';
menu.style.display = 'block';

window.addEventListener('resize', () => {
  menu.style.height =  window.innerWidth > 900 ? 'initial': '0px';
})
