const calculator = () => {
  const
    formBlock = document.getElementById('card_order'),
    arrMozaika = [1990, 9900, 13900, 19900],
    arrSchelkovo = [2999, 14900, 21900, 24900],
    promoCode = document.getElementById('promoCode'),
    priceTotal = document.getElementById('price-total'),
    formCalc = document.getElementById('form-calc');

    if(formCalc){
      let total = 0,
      indexItem = 0,
      priceClub = arrMozaika,
      promo = 1;

    // вывод суммы
    const renderTotal = (sum) => {
      priceTotal.textContent = `${sum} руб.`;
    };

    // расчет суммы
    const sumTotal = () => {
      total = Math.floor(priceClub[indexItem] * promo);
      renderTotal(total);
    };

    formBlock.addEventListener('change', (event) => {
      let target = event.target;

      if (target.name === 'card-type') {
        let parent = target.parentNode;
        let childrens = parent.querySelectorAll('input');
        childrens.forEach((item, i) => {
          if (item === target) {
            indexItem = i;
          }
        });
      }

      const valInput = (val, arrClub) => {
        if (target.value === val) {
          priceClub = arrClub;
  
          let tabs = document.querySelectorAll('.time > input');
          tabs[0].checked = true;
          indexItem = 0;
        }
      };
      valInput('mozaika', arrMozaika);
      valInput('schelkovo', arrSchelkovo);
      
      if(promoCode){
        const promValue = promoCode.value.toLowerCase();
        if(promValue === 'тело2020' || promValue === 'тело 2020'){          
          promo = 0.7;          
        } else {
          promo = 1;
        } 
      }
      sumTotal();
    });
    sumTotal();      
    }
};

export default calculator;