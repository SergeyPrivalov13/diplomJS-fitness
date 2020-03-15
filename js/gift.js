const body = document.body;

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