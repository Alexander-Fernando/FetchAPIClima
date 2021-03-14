const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e){
    e.preventDefault();
    
    //      VALIDANDO CAMPOS
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',
            footer: 'NOTA: Rellene todos los campos'
          })
        return;
    }
    limpiarHTML();
    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais){

    const appID = '321ae4977e18249cc29fe8fa9a35d9f5';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    mostrarSpinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if(datos.cod === "404"){
                Swal.fire({
                    icon: 'error',
                    title: 'Ooops...',
                    text: 'No existe la ciudad en el país elegido'
                })
                limpiarHTML();
                return;
            }

            mostrarDatos(datos);
        });
}


function mostrarDatos(datosAPI){

    limpiarHTML();
    const { name, main: {temp, temp_max, temp_min} } = datosAPI;

    const actual = document.createElement('p');
    actual.innerHTML = `${(temp-273.15).toFixed()} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${(temp_max - 273.15).toFixed()} &#8451`;
    tempMaxima.classList.add('text-xl');

    const named = document.createElement('p');
    named.innerHTML = `${name}`;
    named.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${(temp_min - 273.15).toFixed()} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(named);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    document.querySelector('#ciudad').value = '';
}

function mostrarSpinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    `
    resultado.appendChild(divSpinner);
}
