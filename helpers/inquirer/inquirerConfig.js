require('colors');
const inquirer = require('inquirer');
const { initialMenu, pausaOptions } = require('./inquirerOptions');

const initialMenuInquirer = async() => {
    console.clear();
    console.log('========================='.blue);
    console.log('  Seleccione una opción '.gray);
    console.log('========================='.blue);
    const { option } = await inquirer.prompt( initialMenu );
    return option;
}

const pauseInquirer = async() => {
    await inquirer.prompt( pausaOptions );
}

const inputInquirer = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'value',
            message,
            validate: ( value ) => {
                if ( value === '' || typeof value !== 'string' ) {
                    return 'Por favor ingrese un valor valido';
                }

                return true;
            }
        }
    ];

    const { value } = await inquirer.prompt( question );
    return value;
}

const listarLugares = async( lugares = [] ) => {
    const choices = lugares.map( ( lugar, i ) => {
        const idx = `${ i + 1 }`.green;
        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ '0.'.green } Cancelar`
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt( preguntas );
    return id;
}

module.exports = {
    initialMenuInquirer
    , pauseInquirer
    , inputInquirer
    , listarLugares
}