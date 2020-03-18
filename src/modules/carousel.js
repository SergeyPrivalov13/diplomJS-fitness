const carousel = () => {
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
        if(this.options.position < 0){
          this.options.position = this.slides.length - this.slidesToShow;
        }
        this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlides}%)`;
      }
    }
    nextSlider(){
      if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow){
        ++this.options.position;
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
};

export default carousel;