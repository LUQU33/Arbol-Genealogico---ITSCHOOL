// Solicitamos al usuario la cantidad de personas y lo almacenamos en una variable
let cant_personas = parseInt(prompt("Ingresar Cantidad de Personas: "));

// Validamos que la cantidad ingresada sea un numero entero positivo
while (cant_personas <= 0 || isNaN(cant_personas)){
    cant_personas = parseInt(prompt("Error! ingrese un número entero positivo: "));
}

// Creamos un array con la cantidad de personas
let personas = new Array(cant_personas);

// Guardamos el div contenedor en una variable
const cont_formularios = document.getElementById("contenedor-formularios");

// Creamos un formulario por cada persona
for (let i=0; i<cant_personas; i++){
    const form_persona = document.createElement("form");
    form_persona.classList.add("formulario-persona");
    
    form_persona.innerHTML = `
    <div class="contenedor-titulo">
    <h3 class="form-titulo">Persona ${i + 1}</h3>
    </div>

    <div class="contenedor-persona">
    <label class="form-label">Nombre: </label>
    <input type="text" id="nombre${i}" class="form-input">
    <span id="error-nombre${i}" class="error"></span>
    </div>
    <br>

    <div class="contenedor-persona">
    <label class="form-label">Apellido: </label>
    <input type="text" id="apellido${i}" class="form-input">
    <span id="error-apellido${i}" class="error"></span>
    </div>
    <br>

    <div class="contenedor-persona">
    <label class="form-label">Fecha de Nacimiento: </label>
    <input type="date" id="nacimiento${i}" class="form-input">
    <span id="error-fecha${i}" class="error"></span>
    </div>
    <br>

    <div class="contenedor-persona">
    <label class="form-label">Género(M/F): </label>
    <input type="text" id="genero${i}" class="form-input">
    <span id="error-genero${i}" class="error"></span>
    </div>
    <br>
    `;

    cont_formularios.appendChild(form_persona);
}

// Creamos un boton para guardar estos datos en el array creado
const boton_guardar = document.createElement("button");
boton_guardar.textContent = "Guardar";
boton_guardar.type = "button";
boton_guardar.classList.add("boton-guardar");
boton_guardar.onclick = guardarPersonas;
cont_formularios.appendChild(boton_guardar);

// Creamos la funcion que guarde los datos de los formularios en nuestro array
function guardarPersonas() {

    let datosValidos = true

    for (let i=0; i<cant_personas; i++){

        const nombreInput = document.getElementById(`nombre${i}`);
        const apellidoInput = document.getElementById(`apellido${i}`);
        const fechaInput = document.getElementById(`nacimiento${i}`);
        const generoInput = document.getElementById(`genero${i}`);

        const errorNombre = document.getElementById(`error-nombre${i}`);
        const errorApellido = document.getElementById(`error-apellido${i}`);
        const errorFecha = document.getElementById(`error-fecha${i}`);
        const errorGenero = document.getElementById(`error-genero${i}`);

        // Limpiamos posibles errores
        errorNombre.textContent = "";
        errorApellido.textContent = "";
        errorFecha.textContent = "";
        errorGenero.textContent = "";

        let nombre = nombreInput.value.trim();
        let apellido = apellidoInput.value.trim();
        let fecha = fechaInput.value;
        let genero = generoInput.value.trim().toUpperCase();

        let personaValida = true;

        if(!nombre){
            errorNombre.textContent = "Error, el campo Nombre no puede estar vacío.";
            personaValida = false;
        }
        if(!apellido){
            errorApellido.textContent = "Error, el campo Apellido no puede estar vacío.";
            personaValida = false;
        }
        if(!esFechaValida(fecha)){
            errorFecha.textContent = "Error, ingrese una fecha válida."
            personaValida = false;
        }
        if(genero !== "M" && genero !== "F"){
            errorGenero.textContent = "Error, el género debe ser M o F."
            personaValida = false;
        }

        if(personaValida){
            personas[i] = new Persona(nombre, apellido, fecha, genero);
        } else {
            datosValidos = false;
        }
    }

    if (datosValidos){
        alert("Personas cargadas correctamente!")
        console.log(personas);

        // CALCULOS PARA CREACION DE ALERT FINAL

        // Para persona mas joven y mas vieja
        let masJoven = personas[0];
        let masVieja = personas[0];
        // Para promedio edad general
        let edadPromedio = 0;
        let edadAcumulador = 0;
        let edadContador = 0;
        // Para promedio edad hombres
        let edadPromedioHombres = 0;
        let edadAcumuladorHombres = 0;
        let edadContadorHombres = 0;
        // Para promedio edad mujeres
        let edadPromedioMujeres = 0;
        let edadAcumuladorMujeres = 0;
        let edadContadorMujeres = 0;
        
        // Ciclo for para calculo de edades
        for (let i=0; i<cant_personas; i++){
            const personaActual = personas[i];
                
            const edadActual = calcularEdad(personaActual.nacimiento);
            const edadMasJoven = calcularEdad(masJoven.nacimiento);
            const edadMasVieja = calcularEdad(masVieja.nacimiento);
            
            // Condiciones para obtener persona mas joven y mas vieja
            if (edadActual < edadMasJoven){
                masJoven = personaActual;
            }
            if (edadActual > edadMasVieja){
                masVieja = personaActual;
            }
            // Condiciones para obtener promedios de edades para hombres y mujeres
            if (personaActual.genero == "M"){
                edadAcumuladorHombres += edadActual;
                edadContadorHombres++;
            }
            if (personaActual.genero == "F"){
                edadAcumuladorMujeres += edadActual;
                edadContadorMujeres++;
            }
            // Calculo promedio edad general
            edadAcumulador += edadActual;
            edadContador++;
        }

        edadPromedio = parseFloat(promedio(edadAcumulador, edadContador).toFixed(2));
        edadPromedioHombres = parseFloat(promedio(edadAcumuladorHombres, edadContadorHombres).toFixed(2));
        edadPromedioMujeres = parseFloat(promedio(edadAcumuladorMujeres, edadContadorMujeres).toFixed(2));

        // Para mostrar la diferencia entre promedios de hombres y mujeres
        let diferenciaPromedios = Math.abs(edadPromedioHombres - edadPromedioMujeres);
        diferenciaPromedios = parseFloat(diferenciaPromedios.toFixed(2));

        // Deteccion de nombres repetidos
        let conteoNombres = {};

        // for que recorre el array personas
        for(let persona of personas){
            let nombre = persona.nombre;

            if (conteoNombres[nombre]){
                conteoNombres[nombre]++;
            } else {
                conteoNombres[nombre] = 1;
            }
        }

        let nombreMasRepetido = "No hay nombres repetidos.";
        let cantidadRepeticiones = 1;

        // for que recorre el objeto conteoNombres
        for(let nombre in conteoNombres){
            if(conteoNombres[nombre] > cantidadRepeticiones){
                nombreMasRepetido = nombre;
                cantidadRepeticiones = conteoNombres[nombre];
            }
        }

        // Alert Final
        alert(
            `----------------------------------------------------------------`+`\n`+
            `PERSONA MÁS JOVEN Y MÁS VIEJA`+`\n`+
            `----------------------------------------------------------------`+`\n`+
            `La persona más joven es ${masJoven.nombre}, con ${calcularEdad(masJoven.nacimiento)} años.`+`\n`+
            `La persona más vieja es ${masVieja.nombre}, con ${calcularEdad(masVieja.nacimiento)} años.`+`\n`+
            `----------------------------------------------------------------`+`\n`+
            `PROMEDIOS`+`\n`+
            `----------------------------------------------------------------`+`\n`+
            `El promedio de edades de las personas cargadas es de: ${edadPromedio} años.`+`\n`+
            `El promedio de edades de Hombres es de: ${edadPromedioHombres} años.`+`\n`+
            `El promedio de edades de Mujeres es de: ${edadPromedioMujeres} años.`+`\n`+`\n`+
            `La diferencia entre las edades promedio de Hombres y Mujeres es de: ${diferenciaPromedios} años.`+`\n`+
            `----------------------------------------------------------------`+`\n`+
            `NOMBRE MÁS REPETIDO`+`\n`+
            `----------------------------------------------------------------`+`\n`+
            `El nombre más repetido es: ${nombreMasRepetido}` + `\n` +
            `----------------------------------------------------------------`
        )
    }
}

// Creamos una funcion para validar que se ingrese una fecha de nacimiento adecuada en cada persona
function esFechaValida(fecha){
    // Devolvemos false si la fecha es cadena vacia, undefined o null
    if (!fecha)return false;

    // Devolvemos false si la fecha es futura
    const hoy = new Date();
    const fechaNac = new Date(fecha);
    if (fechaNac > hoy)return false;

    // En caso de haber pasado estas validaciones, la fecha ingresada es valida
    return true;
}

function calcularEdad(fechaNacimiento){
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())){
        edad--;
    }

    return edad;
}

function promedio(acumulador, contador){
    return (acumulador / contador);
}