document.addEventListener('DOMContentLoaded', () => {

  'use strict';
  
  // Функция для popUp
  const popUp = (idPopUp) => {
    
    const popUp = document.querySelectorAll('.popup');

    popUp.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        let target = event.target;
        
        if(!target.closest('.form-content')){
          idPopUp.style.display = 'none'; 
        }
        
        console.log(target);
        
      });

    });
  };
  

  // Блок Header
  const header = () => {
    const
      // Блок с header
      headerMain = document.querySelector('.header-main'),
      // PopUp free_visit_form
      freeVisitForm = document.getElementById('free_visit_form');

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
      if(target.closest('.free-visit p')){
        let dataSet = target.dataset.popup.split('').slice(1).join(''),
          id = document.getElementById(dataSet);

        id.style.display = 'block';
        popUp(id);
        
      } 

      // Перезвоните мне
      if(target.closest('.callback-btn')){
        let dataSet = target.dataset.popup.split('').slice(1).join(''),
          id = document.getElementById(dataSet);

        id.style.display = 'block';
        popUp(id);  
      }
    });  
  };
  header();

  

  





});
