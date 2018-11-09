const mongoose = require('mongoose')
const EventP = mongoose.model('Event')
const utils = require('../handlers/utils')

/**
 * Encuentra todos los eventos propuestos
 */
exports.findAllEvents = () => {
    return new Promise((resolve, reject) => {
        EventP.find({}).exec((err, evento) => {
            if(!err){
                resolve(evento)
            }else{
                reject(null);
            }
        })
    })
}

/**
 * Guarda un evento propuesto
 */
exports.saveEvent = (event, res) => {
    const toSaveEvent = new EventP({...event});
    return new Promise((resolve, reject) => {
        toSaveEvent.save((err, toSaveEvent) => {
            if(!err){
                console.log("El evento se ha guardado evento correctamente");
                resolve({id: toSaveEvent.id, event: event, err: err, res: res, newEvent: toSaveEvent}); 
            }else{
                reject("No se pudo completar")
            }
        })
    });
}

