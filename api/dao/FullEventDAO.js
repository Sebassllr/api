const mongoose = require('mongoose')
const FullEvent = mongoose.model('FullEvent')
const utils = require('../handlers/utils')

/**
 * Guarda un evento
 */
exports.saveFullEvent = event =>{
    const toSaveEvent = new FullEvent({...event});
    return new Promise((resolve, reject) =>{
        toSaveEvent.save((err, toSaveEvent) => {
            console.log("El evento se ha creado correctamente");
            if(!err){
                resolve(toSaveEvent);
            }else{
                reject(false);
            }
        });
    })
}

/**
 * Obtiene todos los eventos
 */
exports.getAllFullEvents = () => {
    return new Promise((resolve, reject) => {
        FullEvent.find({}).exec((err, evento) => {
            console.log(evento);
            if(!err){
                resolve(evento)
            }else{
                reject(null);
            }
        })
    })
}