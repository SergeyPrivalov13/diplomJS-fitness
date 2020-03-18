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

export default slider;