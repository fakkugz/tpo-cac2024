let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener('click',function(){
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    let email = document.querySelector("#email");
    let date = document.querySelector("#birthdate");
    let options = document.querySelector("#options");
    let terms = document.querySelector("#terms");

    document.querySelector("#error-firstname").textContent = '';
    document.querySelector("#error-lastname").textContent = '';
    document.querySelector("#error-email").textContent = '';
    document.querySelector("#error-terms").textContent = '';

    let isValid = true;

    if(!firstname.value.trim() && firstname.required ){
        document.querySelector("#error-firstname").textContent = 'Debe completar el campo nombre';
        isValid = false;
    }
    
    if(!lastname.value.trim() && lastname.required ){
        document.querySelector("#error-lastname").textContent = 'Debe completar el campo apellido';
        isValid = false;        
    }

    if(!email.value.trim() && email.required ){
        document.querySelector("#error-email").textContent = 'Debe completar el campo email';
        isValid = false;        
    }

    if(!date.value.trim() && date.required ){
        document.querySelector("#error-date").textContent = 'Debe colocar una fecha';
        isValid = false;        
    }

    if(!options.value.trim() && options.required ){
        document.querySelector("#error-options").textContent = 'Debe seleccionar una opción';
        isValid = false;        
    }

    if(!terms.checked && terms.required ){
        document.querySelector("#error-terms").textContent = 'Debe aceptar los términos';
        isValid = false;        
    }

    if (isValid) {
        alert("Formulario enviado correctamente");
    }
});