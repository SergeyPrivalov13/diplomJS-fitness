const validMask = () => {
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
};

export default validMask;