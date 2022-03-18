require('colors');

const initialMenu = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que deseas hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Buscar Ubicación`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

const pausaOptions = [
    {
        type: 'input',
        name: 'opcion',
        message: `Presione ${ 'ENTER'.green } para continuar`
    }
]

module.exports = {
    initialMenu
    , pausaOptions
}