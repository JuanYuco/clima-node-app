require('dotenv').config();
const { initialMenuInquirer, pauseInquirer, inputInquirer, listarLugares } = require("./helpers/inquirer/inquirerConfig");
const Busquedas = require("./models/Busquedas");

const main = async() => {
    let validacion = true;
    const busquedas = new Busquedas();
    do {
        const opcion = await initialMenuInquirer();
        switch ( opcion ) {
            case 1:
                // Mostrar Mensaje
                const lugar = await inputInquirer( 'Ciudad' );
                // Buscar los lugares
                const lugares = await busquedas.buscarLugar( lugar );
                // Seleccionar el lugar
                const id = await listarLugares( lugares );
                const lugarSeleccionado = lugares.find( l => l.id === id );
                if ( !lugarSeleccionado ) break;

                const { nombre, lat, lng } = lugarSeleccionado;
                busquedas.agregarHistorial( nombre );
                // Clima
                const { tem, min, max, des } = await busquedas.obtenerClima( lat, lng );
                // Mostrar Resultados
                
                console.log('\nInformación de la ciudad\n'.green);
                console.log(`Nombre: ${ nombre }`);
                console.log(`Lat: ${ lat }`);
                console.log(`Lng: ${ lng }`);
                console.log(`Temperatura: ${ tem }`);
                console.log(`Mínima: ${ min }`);
                console.log(`Máxima: ${ max }`);
                console.log(`Descripción: ${ des }`);
                break;
            case 2:
                busquedas.historial.forEach( ( lugar, i ) =>  {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar }` );
                });
                break;
        }
        validacion = opcion !== 0;
        if ( validacion ) await pauseInquirer();
    } while( validacion );
}

main();