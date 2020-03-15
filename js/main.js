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

/*   // Слайдер Клубные Карты
  const mainSlider = (slideClass, time) => {
    const
      // Обёртка слайдера
      mainSlider = document.querySelector('.main-slider'),
      // Каждый слайд
      slide = document.querySelectorAll(slideClass);
      
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
      setInterval(autoPlay, time);
    };
    startSlide();
    
  };
  mainSlider('.main-slid', 2000);
  //mainSlider('.services-slid');
  mainSlider('.gallery-slid', 3000); */

  // Слайдер
  const slider = (sliderBlock, slideClass, timer, displaySlide, sliderDots) => {
    const
      // Блок слайдера
      slider = document.querySelector(sliderBlock),
      // Каждый слайд
      slide = document.querySelectorAll(slideClass),
      // Блок с точками
      dotsBlock = document.querySelector(sliderDots);
      
    // Присваиваем перому слайду класс active
    //slide[0].style.display = `flex`;
    
    // Функция добавления точек
    const addDots = () => {
      // Проходимся в цикле по слайдам
      slide.forEach((elem, index) => {
        // Создаём элемент li
        const li = document.createElement('li');
        // Добавляем класс
        li.classList.add('dot');
        // Добавляем элемент в блок dotsBlock
        dotsBlock.appendChild(li);

        // Добавляем первой точке класс active
        if (index === 0) {
          li.classList.add('dot-active');
        }
      });      
    };

    if(dotsBlock){
      addDots();
    }    

    const // Точки 
      dot = document.querySelectorAll('.dot');

    // Номер слайда
    let currentSlide = 0,
      // Интервал
      interval;

    // Функция удаления класса у слайда
    const prevSlide = (elem, index) => {
      // Берём текущий слайд и удаляем класс
      elem[index].style.display = `none`;  
    };
    // Функция добавления класса у слайда
    const nextSlide = (elem, index) => {
      // Берём следующий слайд и добавляем класс
      elem[index].style.display = displaySlide;
    };   
    // Функция удаления класса у слайда
    const prevDot = (elem, index, strClass) => {
      // Берём текущий слайд и удаляем класс
      elem[index].classList.remove(strClass); 
    };
    // Функция добавления класса у слайда
    const nextDot = (elem, index, strClass) => {
      // Берём следующий слайд и добавляем класс
      elem[index].classList.add(strClass);
    };   

    // Функция автоматического перелистывания слайдов
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide);
      if(dotsBlock){
        // Точки
        prevDot(dot, currentSlide, 'dot-active');
      }
      // Переходим к следующему слайду
      currentSlide++;
      // Условие для пролистывания слайдоа
      if(currentSlide === slide.length){
        currentSlide = 0;
      }

      nextSlide(slide, currentSlide);
      if(dotsBlock){
        nextDot(dot, currentSlide, 'dot-active');
      }
    };

    // Функция запуска слайдера
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    startSlide(timer);

    // Функция остановки слайдера
    const stopSlide = () => {
      clearInterval(interval);
    };

    // Обработчик события - клик по кнопкам или точкам
    slider.addEventListener('click', (event) => {
      let target = event.target;

      if(!target.matches('.slide-btn, .dot')){
        return;  
      }

      prevSlide(slide, currentSlide);  
        // Точки
      prevDot(dot, currentSlide, 'dot-active');      

      if(target.matches('.next')){
        currentSlide++;
        
      } else if (target.matches('.prev')){
        currentSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
        });
      }

      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      if(currentSlide < 0){
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide);
      nextDot(dot, currentSlide, 'dot-active');      
    });

    // Обработчик события - остановка слайдера
    // Если навели мышку на кнопку
    slider.addEventListener('mouseover', (event) => {
      let target = event.target;
      if(target.matches('.slide-btn') || target.matches('.dot') || target.matches('.slider-btn')){
        stopSlide(1500);
      }
    });
    // Если убрали мышку с кнопки
    slider.addEventListener('mouseout', (event) => {
      let target = event.target;
      if(target.matches('.slide-btn') || target.matches('.dot') || target.matches('.slider-btn')){
        startSlide(1500);
      }
    });
  };
  slider('.main-slider', '.main-slid', 4000, 'flex');
  slider('.services-slider', '.services-slid', 1000, 'block');
  slider('.gallery-slider', '.gallery-slid', 2500, 'flex', '.gallery-dots');

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
