document.addEventListener('DOMContentLoaded', () => {

  'use strict'; 

  const body = document.body,
    // Блок с header
    headerMain = document.querySelector('.header-main');

  // Функция появления модального окна
  const modal = (elem, tar) => {
    // Функция для popUp
    const popUp = (idPopUp) => {      
      const popUp = document.querySelectorAll('.popup');

      popUp.forEach((elem) => {
        elem.addEventListener('click', (event) => {
          let target = event.target;
          
          if(!target.closest('.form-content') || target.closest('.close-btn')){
            idPopUp.style.display = 'none';
            body.style.cssText = `overflow-x: hidden`; 
          } 
          
        });
      });
    };

    if(tar.closest(elem)){
      let dataSet = tar.dataset.popup.split('').slice(1).join(''),
        id = document.getElementById(dataSet);

      id.style.display = 'block';
      body.style.overflow = `hidden`;     
      popUp(id);        
    }
  };  

  // Блок Header
  const header = () => {
    headerMain.addEventListener('click', (event) => {
      let target = event.target;

      // Выпадающее меню на кнопку "Выбрать клуб"
      const ul = document.querySelector('.clubs-list ul');
      if(target.closest('.clubs-list p')){
        if(!ul.style.transform || ul.style.transform === `scaleY(0)`){
          ul.style.transform = `scaleY(1)`;
        } else {
          ul.style.transform = `scaleY(0)`;
        }        
      } else{        
        ul.style.transform = `scaleY(0)`;        
      }
      if(target.closest('.clubs-list ul')){
        ul.style.transform = `scaleY(1)`;        
      }      

      // Записаться на бесплатный приём
      modal('.free-visit p', target);

      // Перезвоните мне
      modal('.callback-btn', target);

      // Бургер меню
      const menu = document.querySelector('.popup-menu');
      if(target.closest('.menu-button')){
        menu.style.display = `flex`;        
      }
      if(target.closest('.close-menu-btn') || target.closest('.scroll')){
        menu.style.display = `none`;
      }  
    });  
  };
  header();

  // Слайдер Клубные Карты
  const mainSlider = (slideClass) => {
    const
      // Обёртка слайдера
      mainSlider = document.querySelector('.main-slider'),
      // Каждый слайд
      slide = document.querySelectorAll(slideClass);
      console.log(slide);
      
    // Номер слайда
    let currentSlide = 0;
    
    // Функция автопрокрутки
    const autoPlay = () => {
      slide[currentSlide].style.display = `none`;
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      slide[currentSlide].style.display = `flex`;
    };
    // Функция запуска слайда
    const startSlide = () => {
      setInterval(autoPlay, 1000);
    };
    startSlide();
    
  };
  mainSlider('.main-slid');

  // На верх
  const toTop = () => {
    const goTopBtn = document.getElementById('totop');  

    const trackScroll = () => {
      const menuBtn = document.querySelector('.top-menu');
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
  toTop();



  

  

  





});
