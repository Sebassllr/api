const utils = require('../handlers/utils')
const schedule = require('node-schedule') 
const eventService = require('../services/EventService')

/**
 * Metodo encargado de finalizar la votacion de los eventos
 */
schedule.scheduleJob('0 0 * * *', () => {
    console.log("Se cierran votaciones de eventos");
    eventService.findAllEvents()
    .then(allEvents => eventService.updateEvents(allEvents))
    .catch(err => res.send(err));
})

exports.closeVotation = (req, res) => {
    const eventId = req.body;
    eventService.findEventById(eventId.id)
    .then(event => eventService.getMaxVotes(event))
    .then(event => res.send(event))
    .catch(err => res.send(err));
}

/**
 * Encuentra todos los eventos
 */
exports.findAll = (req, res) => {
    console.log("Se procede a encontrar todos los eventos");
    eventService.findAllEvents()
    .then(array => res.send(array))
    .catch(err => res.send(err));
}

exports.findAllProps = (req, res) => {
    console.log("Se procede a encontrar todas las propuestas");
    eventService.findAllEventsProps()
    .then(array => res.send(array))
    .catch(err => res.send(err));
}

exports.findByCategory = (req, res) => {
    const params = req.query.category;
    console.log('Se procede a encontrar las caracterísiticas por categoría');
    eventService.findAllEventsByCategory(params, res).then(char => res.send(char))
    .catch(err => {
        res.send('Por favor revisar los parámetros'); 
        console.log(err)
    });
}

exports.findCharacteristicByEventId = (req, res) => {
    const params = req.query;
    console.log(params);
    eventService.findCategoryByEventId(params).then(char => res.send(char))
    .catch(err => {
        console.log(err);
        res.send('Por favor revisar los parámetros')
    })
}

/**
 * Crea un evento
 */
exports.create = (req, res) => {
    const event = req.body;
    eventService.saveEvent(event).then(event => {
        console.log(event);
        res.send("El evento se ha guardado correctamente");
    }).catch(err => {
        console.log("Hubo un error");
        console.log(err);
        res.send(err)
    });
}

exports.findAllFinalizeEvents = (req, res) => {
    eventService.findAllEvents()
    .then(array => {

        const date = new Date();
        const dates = [];
        array.forEach((e, index) => {
            e.characteristics.forEach(el => {
                console.log(el);
                if(el.category === "Fecha del evento" ){
                    const newDate = new Date(el.value);
                    if(newDate < date){
                        dates.push(e);
                    }
                }
            });
        });
        res.send(dates);
    }).catch(err => res.send(err));
}

exports.updateEvent = (req, res) => {
    const newEvent = req.body;
    eventService.updateEvent(newEvent)
    .then(event => {
        console.log(event);
        res.send("Evento actualizado correctamente");
    }).catch(err => res.send(err));
}

/**
 * Cierra las votaciones
 */
exports.closeEvent = (req, res) => {
    const vote = req.body;
    console.log("Se procede a cerrar las votaciones");
    eventService.updateEvent(vote)
    .then(event => {
        console.log('Se actualiza evento correctamente');
        res.send(event);
    }).catch(err => res.send(err));
}

/**
 * Funcion encargada de actualizar una votación
 */
exports.updateVote = (req, res) => {
    const vote = req.body;
    console.log(vote);
    console.log("Se procede a actualizar la votación");
    eventService.vote(vote)
    .then(vote => {
        console.log("Se ha votado correctamente");
        res.send(vote);
    }).catch(err => res.send(err));
}