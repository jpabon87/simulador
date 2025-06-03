//CONSTANTES


const DIAS_ANNO = 360;



// FUNCIÓN 1: ENTRADA DE DATOS
function capturaDatosProspecto() {
    console.log("\n === CAPTURA DE DATOS DE PROSPECTO ===")

    let nombre = "";
    while (nombre === "" || nombre === null){
        nombre = prompt("ingrese su nombre:");
        if (nombre === null){
            alert("Operación cancelada");
            return null;
        }
        if (nombre.trim() === ""){
            alert("El nombre no puede estar vacio");
            nombre = "";
        }
    }

    let salarioBasico = 0;
    let entradaValida = false;
    while (!entradaValida){
        let salarioStr = prompt("Ingrese el salario básico incluido el auxilio de transporte:");
        if (salarioStr === null){
            alert("Operación cancelada");
            return null;
        }

        salarioBasico = parseFloat(salarioStr);
        if (isNaN(salarioBasico) || salarioBasico <= 0){
            alert("Ingrese un salario válido, mayor a 0")
        }else{
            entradaValida = true;
        }
    }

    let diasLaborados = 0;
    entradaValida = false;
    while (!entradaValida){
        let diasStr = prompt("Ingrese los días laborados en el semestre (1-180):\n" + "Nota: Un semestre completo son 180 días laborales");
        if (diasStr === null){
            alert("Operación cancelada");
            return null;
        }

        diasLaborados = parseInt(diasStr);
        if (isNaN(diasLaborados) || !Number.isInteger(diasLaborados) || diasLaborados <1 || diasLaborados > 180){
            alert("Ingrese un número de días válido (1-180)\n" + "Recuerde: 180 días = 6 meses completos del semestre");
        }else{
            entradaValida = true; 
        }
    }

    let datosProspecto = {
        nombre: nombre.trim().toUpperCase(),
        salarioBasico: salarioBasico,
        diasLaborados: diasLaborados,
        fechaCalculo: new Date().toLocaleDateString('es-CO')
    };

    console.log("Datos Capturados:", datosProspecto);
    return datosProspecto;
}

// Función 2 : procesamiento de datos
function calcularPrimaServicios(datosProspecto){

console.log("\n=== PROCESANDO CÁLCULO DE PRIMA ===");

if(!datosProspecto){
    console.log("Error: No hay dato del prospecto para procesar");
    return null;
}

let salarioBase = datosProspecto.salarioBasico;

// formula para calcular prima en Colombia:
// Prima = salario x Días trabajados / 360
// donde: 360 = días del año laboral

let primaCalculada = (salarioBase * datosProspecto.diasLaborados) /DIAS_ANNO;

let resultadoCalculo ={
    ...datosProspecto,
    primaCalculada: Math.round(primaCalculada)
};

console.log("Calculo procesado:", resultadoCalculo);
console.log("Fórmula aplicada: " + salarioBase + " x " + datosProspecto.diasLaborados + " / 360 = " + Math.round(primaCalculada));
return resultadoCalculo;

}

//Función 3: salida de reultados
function mostrarResultados(resultado){
    console.log("\n===Resultados del calculo de prima ===");

    if (!resultado){
        console.log("Error, no hay resultados para mostrar");
        alert("Error en el calculo, intente de nuevo.");
        return;
    }

    let mensaje = "";
    mensaje += "CALCULADORA DE PRIMA COLOMBIA\n";
    mensaje += "========================\n\n";
    mensaje += "Datos del prospecto\n";
    mensaje += " - Nombre: "+ resultado.nombre + "\n";
    mensaje += "- Fecha calculo: " + resultado.fechaCalculo + "\n\n";

    mensaje += "INFORMACIÓN SALARIAL\n";
    mensaje += "- Salario básico: $" + resultado.salarioBasico.toLocaleString('es-CO') + "\n"; 

    mensaje += "TIEMPO LABORADO EN EL SEMESTRE\n";
    mensaje += "- Días laborados: " + resultado.diasLaborados + " de 180\n";

     mensaje += "CALCULO APLICADO\n";
     mensaje += "- Fórmula: Salario X días trabajados / 360\n";
     mensaje += "- Operación: $" + resultado.salarioBasico.toLocaleString('es-CO') + " X " + resultado.diasLaborados + " /360 \n\n";

     mensaje += "Resultado Final:\n";
     mensaje += "- Prima de Junio: $ " + resultado.primaCalculada.toLocaleString('es-CO') + "\n\n";

     console.log(mensaje);
     alert(mensaje);

}

     //FUNCIÓN PRINCIPAL

     function iniciarCalculadora(){
        console.clear();
        console.log("=== CALCULADORA DE PRIMA DE SERVICIOS - COLOMBIA ===");

        let continuar = true;

        while (continuar){
            let opcion = prompt("Menu principal:\n" +
            "1. Calcular prima de servicios\n" +
            "2. Salir\n\n");
        
        if (opcion === null){
            continuar = false;
            continue;
        }

        switch(opcion){
        case "1":
            let datos = capturaDatosProspecto();
            if (datos !== null){
                let resultado = calcularPrimaServicios(datos);
                mostrarResultados(resultado);
            }
            break;
        case "2":
            continuar = false;
            alert("Gracias por usar la calculadora de prima");
            break;

        default:
            alert("Opción no válida. Seleccione 1 o 2")
            break;
        }
     }

     
     console.log("\n=== CALCULADORA FINALIZADA ===");

 }

  //aqui inicia
   console.log("Calculadora de prima de servicios cargada")
    iniciarCalculadora();

