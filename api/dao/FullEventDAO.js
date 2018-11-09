const mongoose = require('mongoose')
const FullEvent = mongoose.model('FullEvent')
const utils = require('../handlers/utils')

/**
 * Guarda un evento
 */
exports.saveFullEvent = (event, res) =>{
    const toSaveEvent = new FullEvent({...event});
    return new Promise((resolve, reject) =>{
        toSaveEvent.save((err, toSaveEvent) => {
            console.log("El evento se ha creado correctamente");
            if(res && !err){
                utils.show(res, err, toSaveEvent)
                resolve(toSaveEvent);
            }else{
                reject("Hubo un guardando el evento")
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
            if(!err){
                resolve(evento)
            }else{
                reject(null);
            }
        })
    })
}