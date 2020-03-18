const toTop = () => {
  const goTopBtn = document.getElementById('totop');  

  const trackScroll = () => {
    const menuBtn = document.querySelector('.top-menu'),
      headerMain = document.querySelector('.header-main');
    let scrolled = window.pageYOffset,
      coords = headerMain.clientHeight,
      headHeight = document.querySelector('.head-main').clientHeight;
    
      // Прилипание меню
    if(scrolled > headHeight){
      menuBtn.style.position = `fixed`;  
    }
    if(scrolled < headHeight){
      menuBtn.style.position = `relative`;  
    }  
    
    // Появление кнопки на верх
    if (scrolled > coords) {
      goTopBtn.style.display = `block`;
    }
    if (scrolled < coords) {
      goTopBtn.style.display = `none`;
    }
  };

  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  };

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
};

export default toTop;