import headerBlock from './modules/headerBlock';
import slider from './modules/slider';
import carousel from './modules/carousel';
import toTop from './modules/toTop';
import validMask from './modules/validMask';
import sendForm from './modules/sendForm';
import calculator from './modules/calculator';

// Главный блок  
headerBlock();  

// Слайдер  
slider('.main-slider', '.main-slid', 4000, 'flex');
slider('.gallery-slider', '.gallery-slid', 2500, 'flex', '.gallery-dots');

// Карусель
carousel();

// На верх
toTop();

// Маска для телефона
validMask(); 

// Ajax - отправка формы
sendForm('form1', 'person-check3');
sendForm('form2', 'person-check4');
sendForm('card_order', 'person-check2');
sendForm('banner-form', 'person-check1');
sendForm('footer_form', 'club-name');

// Калькулятор - Клубные карты
calculator();

