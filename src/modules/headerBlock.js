const headerBlock = () => {
  // Функция появления модального окна
  const modal = (elem, tar) => {
    const bodyBlock = document.body;
    // Функция для popUp
    const popUp = (idPopUp) => {      
      const popUp = document.querySelectorAll('.popup');

      popUp.forEach((elem) => {
        elem.addEventListener('click', (event) => {
          let target = event.target;
          
          if(!target.closest('.form-content') || target.closest('.close-btn')){
            idPopUp.style.display = 'none';
            bodyBlock.style.cssText = `overflow-x: hidden`;  
          } 
          
        });
      });
    };

    if(tar.closest(elem)){
      let dataSet = tar.dataset.popup.split('').slice(1).join(''),
        id = document.getElementById(dataSet);

      id.style.display = 'block';
      bodyBlock.style.overflow = `hidden`;     
      popUp(id);        
    }
  };  
  // Подарок
  const gift = () => {
    // Блок с подарком
    const fixedFift = document.querySelector('.fixed-gift');

    if(fixedFift){
      fixedFift.addEventListener('click', (event) => {
        let target = event.target;
        if(target.closest('.fixed-gift')){
          fixedFift.style.display = 'none';
          modal('.fixed-gift', target);        
        }
      });
    }
  };
  gift();

  // Блок Header
  const header = () => {
    const headerMain = document.querySelector('.header-main');
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
};

export default headerBlock;