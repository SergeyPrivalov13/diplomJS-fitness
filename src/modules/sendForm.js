const sendForm = (formId, checkName) => {
  const
    bodyBlock = document.body,
    errorMessage = 'Что то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = document.getElementById('thanks'),
    consentMessage = 'Нужно ваше согласие наобработку персональных данных',
    // Форма
    form = document.getElementById(formId),
    // Блок для показа сообщения
    statusMessage = document.createElement('div');
    statusMessage.classList.add('load');

  // Функция запроса на сервер
  const postData = (body) => {
    return new Promise((resolve, reject) => {
      // Создаём элемент XMLHttpRequest
      const request = new XMLHttpRequest();  
      // Отслеживаем статус отправки сообщения
      request.addEventListener('readystatechange', () => {
  
        if(request.readyState !== 4){
          return;
        }  
        if(request.status === 200){
          resolve();        
        } else {
          reject(request.status);      
        }   
      });
  
      // Метод отправки и путь к серверу
      request.open('POST', './server.php');
  
      // Настройка заголовков
      // Настройка заголовков для формата JSON
      request.setRequestHeader('Content-type', 'application/json');    
  
      // Открываем соединение и отправляем данные на сервер
      // Отправляем данные в формате JSON
      request.send(JSON.stringify(body));
    });
  };

  const thanks = (elem) => {
    elem.addEventListener('click', (event) => {
      let target = event.target;
      
      if(!target.closest('.form-content') || target.closest('.close-btn')){
        elem.style.display = 'none';
        bodyBlock.style.cssText = `overflow-x: hidden`;  
      }  
    });
  };

  // Отслеживаем клик по кнопке
  form.addEventListener('submit', (event) => {
    // Запрещаем стандартное поведение кнопки (отправку формы)
    event.preventDefault();
    let inputs = form.querySelectorAll('input'),
      checkInpit = document.getElementsByName(checkName)[0].checked;
    if(checkInpit){        
      // Проверка на пустоту полей
      for(let i = 0; i < inputs.length; i++){
        if(inputs[i].getAttribute('name') !== 'promo'){
          if(inputs[i].value === ''){            
            alert('Заполните все поля в форме!');  
            return;
          }            
        }  
      }

      // Добавляем элемент на страницу
      form.appendChild(statusMessage);
    
      // Добавляем сообщение о Загрузке
      statusMessage.textContent = loadMessage;

      // Объект FormData - содержит данные из формы
      const formData = new FormData(form);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body)
        .then(() => {          
          if(form.getAttribute('name') === 'free-visit-form'){
            const freeVisit = document.getElementById('free_visit_form');
            freeVisit.style.display = 'none';
          }

          if(form.getAttribute('name') === 'callback-form'){
            const callback = document.getElementById('callback_form');
            callback.style.display = 'none';
          }
          
          successMessage.style.display = `block`;
          thanks(successMessage);
          form.reset();
          statusMessage.remove();
          
          setTimeout(() => {
            successMessage.style.display = `none`;
            bodyBlock.style.cssText = `overflow-x: hidden`;
            statusMessage.remove();
          }, 5000);
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error); 
        });
        
      } else {
        alert(consentMessage);  
      }   
  });
};

export default sendForm;