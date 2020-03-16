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
  slider('.gallery-slider', '.gallery-slid', 2500, 'flex', '.gallery-dots');

  // Карусель
  class SliderCarousel{
    constructor({
      main,
      wrap,
      position = 0,
      infinity = false,   // Бесконечная прокрутка
      next,               // Стрелочка в право
      prev,               // Стрелочка в лево
      slidesToShow = 3    // Кол-во показываемых слайдов по умолчанию

    }){
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      // Все слайды
      this.slides = document.querySelector(wrap).children;
      // Стрелочки
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);

      this.slidesToShow = slidesToShow;

      this.options = {        
        position,                                         // Позицыя
        infinity,                                         // Бесконечность
        widthSlides: Math.floor(100 / this.slidesToShow)  // Ширина слайдера

      };
    }
  
    // Запускает слайдер
    init(){
      this.addGloClass();
      this.addStyle();

      // Запускаем метод если пользователь передал кнопки
      if(this.prev && this.next){
        this.controlSlider();
      } else {
        // Иначе создаём свои кнопки
        this.addArrow();
        this.controlSlider();
      }
    }

    // Метод добавление своих классов
    addGloClass() {
      // Добавчляем класс к блокам
      this.main.classList.add('glo-slider');
      this.wrap.classList.add('glo-slider__wrap');
      // Перебираем все слайды
      for(const item of this.slides) {
        // Добавляем каждому слайду класс
        item.classList.add('glo-slider__item');
      }
    }

    // Метод добавление стилей
    addStyle() {
      // Добавляем тэг style
      const style = document.createElement('style');
      // Добавляем id
      style.id = 'slideCarousel-style';
      // Прописываем стили
      style.textContent = `
        .glo-slider {
          overflow: hidden !important;
        }
        .glo-slider__wrap {
          display: flex !important;
          transition: transform 0.5s !important;
          will-change: tranform !important;
        }
        .glo-slider__item {
          flex: 0 0 ${this.options.widthSlides}% !important;
        }

      `;

      // Вставляем в head
      document.head.appendChild(style);
    }

    // Клик по кнопкам
    controlSlider(){
      this.prev.addEventListener('click', this.prevSlider.bind(this));
      this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider(){
      if(this.options.infinity || this.options.position > 0){
        --this.options.position;
        console.log(this.options.position);
        if(this.options.position < 0){
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlides}%)`;
      }
    }
    nextSlider(){
      if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
        ++this.options.position;
        console.log(this.options.position);
        if(this.options.position > this.slides.length - this.slidesToShow){
          this.options.position = 0;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlides}%)`;
      }
    }
    // Метод добавления кнопок
    addArrow(){

    }
  }

  const carousel = new SliderCarousel({
    main: '.services-wrapper',    // Блок со слайдером
    wrap: '.services-slider',     // Блок со слайдами
    prev: '#test-left',           // Стрелочка на лево
    next: '#test-right',          // Стрелочка на право
    slidesToShow: 5,              // Кол-во слайдов
    infinity: true,               // Прокрутка по кругу
  });
  // Запуск слайдера
  carousel.init();

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

  // Маска для телефона  
  const setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
    }
  };  
  const mask = (event) => {
    let target = event.target;  

    let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = target.value.replace(/\D/g, "");  

    if (def.length >= val.length) {
      val = def;
    }
    target.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
    if (event.type === "blur") {
        if (target.value.length === 2) {
          target.value = "";
        }
    } else {
      setCursorPosition(target.value.length, target);
    }
  };  

  let input = document.querySelectorAll('input');
  input.forEach((elem) => {
    
    if(elem.getAttribute('name') === 'phone'){
      elem.addEventListener('input', mask, false);
      
    } else if(elem.getAttribute('name') === 'name'){
      elem.addEventListener('input', () => {
        let placeName = elem.value,
              rep = /[-\.;+=@#$%^&*№;":?!<>`~":'a-zA-Z0-9]+$/i;
            if (rep.test(placeName)) {
              placeName = placeName.replace(rep, '');
              elem.value = placeName;
            }
      });
    }
  });

  // Калькулятор - Клубные карты
  const cards = () => {
    const 
    // Блок с формой
    cardOrder = document.getElementById('card_order'),
    // Блок с месяцами
    time = document.querySelector('.time'),
    // Месяца
    timeMounth = time.querySelectorAll('input'),
    // Тело «Мозаика»
    mozaika = document.getElementById('card_leto_mozaika'),
    // Тело «Щелково»
    schelkovo = document.getElementById('card_leto_schelkovo'),
    // Промокод
    promoCode = document.getElementById('promoCode'),
    // Цена
    priceTotal = document.getElementById('price-total'),
    // Поля ввода
    // Имя
    name = document.getElementById('callback_form-name'),
    // Номер телефона
    phone = document.getElementById('callback_form-phone'),
    // Обработка персональных данных
    cardCheck = document.querySelector('.card_check'),
    // Кнопка забронировать
    orderBtn = document.querySelector('.card-order-btn');    
    
    const countSum = () => {
      let total = 0,
        timeValue,
        clubValue;
      
      const promoValue = promoCode.value;      

      const valueRadio = (inputType) => {
        let nameRadio = document.getElementsByName(inputType);
        for( let i = 0; i < nameRadio.length; i++){
          if(nameRadio[i].type === 'radio' && nameRadio[i].checked){
            timeValue = +nameRadio[i].value;
          }
        }
      };
      valueRadio('card-type');

      const valueRadi = (inputType) => {
        let nameRadio = document.getElementsByName(inputType);
        for( let i = 0; i < nameRadio.length; i++){
          if(nameRadio[i].type === 'radio' && nameRadio[i].checked){
            clubValue = nameRadio[i].value;
          }
        }
      };
      valueRadi('club-name');

      const totalVal = (numb, val) => {
        if(timeValue === numb){
          total = val;  
        }        
      }; 
      const totalValPromo = (numb, val) => {
        if(timeValue === numb){
          total = Math.floor(val - (val / 100 * 30));  
        }        
      }; 

      if(promoValue === 'ТЕЛО2020'){
        if(clubValue === 'mozaika'){
          totalValPromo(1, 1999);
          totalValPromo(6, 9900);
          totalValPromo(9, 13900);
          totalValPromo(12, 19900);
        } else {
          totalValPromo(1, 2999);
          totalValPromo(6, 14900);
          totalValPromo(9, 21900);
          totalValPromo(12, 24900);
        } 
        
      } else {
        if(clubValue === 'mozaika'){
          totalVal(1, 1999);
          totalVal(6, 9900);
          totalVal(9, 13900);
          totalVal(12, 19900);
        } else {
          totalVal(1, 2999);
          totalVal(6, 14900);
          totalVal(9, 21900);
          totalVal(12, 24900);
        }  
      }
      priceTotal.textContent = `${total} руб.`;  

    };

    cardOrder.addEventListener('change', (event) => {
      let target = event.target;
      
      if(target.matches('input')){
          countSum();
        }
      
    });
  };
  cards();



  

  

  





});
