const fs = require('fs');
const axios = require('axios').default;

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get paramMapBox() {
        return {
            'limit': 5,
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY || ''
        }
    }

    get paramWeather() {
        return {
            'lang': 'es',
            'units': 'metric',
            'appid': process.env.OPENWEATHER_KEY || ''
        }
    }

    async buscarLugar( lugar = '' ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map( l => ({
                id: l.id,
                nombre: l.place_name,
                lng: l.center[0],
                lat: l.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async obtenerClima( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    ...this.paramWeather,
                    lat,
                    lon
                }
            });

            const resp = await instance.get();
            const { main, weather } = resp.data;
            return {
                des: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                tem: main.temp
            }
        } catch( error ) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ) {
        if ( this.historial.find( l => l.toLocaleLowerCase() === lugar.toLocaleLowerCase() ) ) {
            return;
        }

        this.historial.unshift( lugar );
        if ( this.historial.length > 5 ) this.historial.pop();
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify(payload) );
    }

    leerDB(){
        if ( !fs.existsSync( this.dbPath ) ) return;
        
        const { historial } = JSON.parse( fs.readFileSync( this.dbPath ) );
        this.historial = [ ...historial ];
    }
}

module.exports = Busquedas;