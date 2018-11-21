const mongoose = require('mongoose')
const EventP = mongoose.model('Event')

/**
 * Encuentra todos los eventos propuestos
 */
exports.findAllEvents = () => {
    return new Promise((resolve, reject) => {
        EventP.find({state: true}).exec((err, evento) => {
            console.log(evento);
            if(!err){
                resolve(evento)
            }else{
                reject(null);
            }
        })
    })
}

exports.findEventById = id => {
    return new Promise((resolve, reject) => {
        EventP.findById(id).exec((err, evento) => {
            console.log(evento);
            if(!err){
                resolve(evento)
            }else{
                reject(null);
            }
        })
    });
}

exports.updateEvent = (id, event) => {
    return new Promise((resolve, reject) => {
        EventP.findByIdAndUpdate(id, event, (err, event) => {
            if(!err){
                resolve(event);
            }else{
                reject(err);
            }
        })
    })
}

/**
 * Guarda un evento propuesto
 */
exports.saveEvent = (event) => {
    const toSaveEvent = new EventP({...event});
    return new Promise((resolve, reject) => {
        toSaveEvent.save((err, toSaveEvent) => {
            console.log(err);
            if(!err){
                console.log("El evento se ha guardado evento correctamente");
                resolve(toSaveEvent); 
            }else{
                reject("No se pudo completar")
            }
        })
    });
}
