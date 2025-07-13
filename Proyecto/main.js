    console.log('main.js cargado en ecommerce.html');

    
    function formatCurrency(input) {
        let value = input.value.replace(/\D/g, '');
        if (value) {
            input.value = Number(value).toLocaleString('es-CO');
        } else {
            input.value = '';
        }
    }

    function updateCalcularPrimaButton() {    
        const ingresosInput = document.getElementById("ingresos");
        const diasInput = document.getElementById("diasLaborados");
        const nombreInput = document.getElementById("suNombre");
        const button = document.getElementById("calcularPrima");
        const errorDias = document.getElementById("errorDiasLaborados");
        const errorNombre = document.getElementById("errorNombre");

        //Validar ingresos
        const ingresosValue = ingresosInput.value.replace(/\D/g, '');
        const ingresosValido = ingresosValue.length > 0 && !isNaN(Number(ingresosValue));

        //Validar días
        const dias = parseInt(diasInput.value, 10);
        const diasValido = dias >= 1 && dias <= 180;

        //Mostrar error si días no es válido
        if (!diasValido && diasInput.value !== '') {
            errorDias.textContent = "Debe ingresar un número entre 1 y 180";
        } else {
            errorDias.textContent = "";
        }

        //Validar nombre
        const nombreValido = nombreInput.value.trim() !== '';

        //Mostrar error si nombre no es válido
        if (!nombreValido && nombreInput.value !== ''){
            errorNombre.textContent = "Por favor escriba su nombre"
        }else{
            errorNombre.textContent = "";
        }

        //Habilitar o desabilitar el botón
        button.disabled = !(ingresosValido && diasValido && nombreValido);


    }

    function calcularPrima() {
        const ingresos = parseFloat(document.getElementById("ingresos").value.replace(/\./g, '').replace(',', '.'));
        const dias = parseInt(document.getElementById("diasLaborados").value, 10);
        const resultadoDiv = document.getElementById("resultadoPrima");
        const botonInvertir = document.getElementById("boton-invertir");
        const mensaje = document.getElementById("mensajeFinal");
        const boton = document.getElementById("calcularPrima");

         // Cambiar datos del boton
         boton.style.backgroundColor = "#28a745";
         boton.textContent = "Prima calculada" 
         boton.classList.add("btn-prima-calculada")
   

        if (isNaN(ingresos) || isNaN(dias)) {
            resultadoDiv.textContent = "Por favor ingrese valores válidos.";
            return;
        }

        const prima = (ingresos * dias) / 360;
        const primaFormateada = prima.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

        resultadoDiv.textContent = `La prima que deberías recibir es: ${primaFormateada}`;
        botonInvertir.style.display = "block";
        mensaje.style.display = "block"; // Mostrar el mensaje cuando hay resultado


        // Aqupi se guarda el nombre LocalStorage
        const nombre = document.getElementById("suNombre").value.trim();
        localStorage.setItem('nombreUsuario', nombre);
    }

    //LocalStorage

      document.addEventListener('DOMContentLoaded', () => {
    const mensaje = document.getElementById('mensajeBienvenida');
    if (mensaje) {
        const nombre = localStorage.getItem('nombreUsuario');
        if (nombre) {
            mensaje.textContent = `Hola ${nombre}, vamos a invertir`;
        } else {
            mensaje.textContent = `¡Hola! vamos a invertir`;
        }
    }
});


    // Listeners para que la función se ejecute
    document.getElementById("ingresos").addEventListener('input', updateCalcularPrimaButton);
    document.getElementById("diasLaborados").addEventListener('input', updateCalcularPrimaButton);
    document.getElementById("suNombre").addEventListener('input', updateCalcularPrimaButton);
    document.getElementById("calcularPrima").addEventListener("click", calcularPrima);

