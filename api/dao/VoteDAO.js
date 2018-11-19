const mongoose = require('mongoose')
const Vote = mongoose.model('Vote')
const utils = require('../handlers/utils')

/**
 * Obtiene una votación por Id del evento
 */
exports.findVoteByEventId = value => {

    return new Promise((resolve, reject) => {
        Vote.findOne({id: value}).exec((err, vote) => {
            console.log(vote);
            !err? resolve(vote) : reject("Hubo un error");
        });
    });
}

/**
 * Guarda la votación
 */
exports.saveVote = vote => {
    const toSaveVotation = new Vote({...vote});
    return new Promise((resolve, reject) => {
        toSaveVotation.save((err, toSaveVotation) => {
            console.log(err);
            console.log("La votación se ha guardado evento correctamente");
            !err ? resolve(toSaveVotation): reject(err);
        })
    });
}

/**
 * Encuentra la votación y la actualiza
 */
exports.findIdAndUpdateVote = (id, vote, res) => {
    
    console.log("Se actualiza votacion");
    return new Promise((resolve, reject) => {
        Vote.findByIdAndUpdate(id, vote, (err, vote) => {
            
            if(!err){
                utils.show(res, err, vote);
                resolve(vote);
            }else{
                reject("No se pudo recuperar votación");
            }
        });
    })
}