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
    .then(event => event);
})

/**
 * Encuentra todos los eventos
 */
exports.findAll = (req, res) => {
    console.log("Se procede a encontrar todos los eventos");
    eventService.findAllEvents().then(array => utils.show(res, '', array));
}

/**
 * Crea un evento
 */
exports.create = (req, res) => {
    const event = req.body;
    eventService.saveEvent(event, res);
}

/**
 * Cierra las votaciones
 */
exports.closeEvent = (req, res) => {
    const vote = req.body;
    console.log("Se procede a cerrar las votaciones");
    eventService.updateEvent(vote, res);
}

/**
 * Funcion encargada de actualizar una votación
 */
exports.updateVote = (req, res) => {
    const vote = req.body;
    console.log("Se procede a actualizar la votación");
    eventService.getVote(vote, res);
}






