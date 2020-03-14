document.addEventListener('DOMContentLoaded', () => {

  'use strict';
  
  

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
          } 
          
        });
      });
    };

    if(tar.closest(elem)){
      let dataSet = tar.dataset.popup.split('').slice(1).join(''),
        id = document.getElementById(dataSet);

      id.style.display = 'block';      
      popUp(id);        
    }
  };
  
  // Подарок
  const gift = () => {
    // Блок с картинкой
    const fixedFift = document.querySelector('.fixed-gift');

    fixedFift.addEventListener('click', (event) => {
      let target = event.target;
      if(target.closest('.fixed-gift')){
        fixedFift.style.display = 'none';
        modal('.fixed-gift', target);        
      }
    });
  };
  gift();

  // Блок Header
  const header = () => {
    const
      // Блок с header
      headerMain = document.querySelector('.header-main');

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
      } else {
        console.log('no');        
      }
      if(target.closest('.close-menu-btn') || target.closest('.scroll')){
        menu.style.display = `none`;
      }
    });  
  };
  header();



  

  

  





});
