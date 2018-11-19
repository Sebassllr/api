const eventDao = require('../dao/EventDAO')
const fullEventDao = require('../dao/FullEventDAO')
const voteDao = require('../dao/VoteDAO')

/**
 * Encargado de guardar un evento
 */
exports.saveEvent = (newEvent, res) => {
    return eventDao.saveEvent(newEvent, res);
}

/**
 * Encuentra todos los eventos que ya han sido cerrados por fecha de votación
 */
exports.findAllEvents = () => {
    return fullEventDao.getAllFullEvents().then(events => events);
}

/**
 * Encuentra todos los eventos que ya han sido cerrados por fecha de votación
 */
exports.findAllEventsProps = () => {
    return eventDao.findAllEvents().then(events => events);
}

/**
 * Actualiza los eventos cuya fecha de finalización ha sido superada
 */
exports.updateEvents = events => {
    const promise = new Promise((resolve, reject) => {
        const oldEvents = events.filter(event => {
            const date = new Date(event.closeVot);
            const today = new Date();
            return date <= today;
        })
        console.log(events);
        oldEvents.forEach(event => {
            getMaxVotes(event).then(fullevent => {
                fullEventDao.saveFullEvent(fullEvent).then(event => {
                    if(event){
                        resolve(event)
                    }else{
                        reject(false);
                    }
                    
                });
            })
        })
    });
    return promise;
}

exports.findEventById = eventId => {
    return new Promise((resolve, reject) => {
        eventDao.findEventById(eventId).then(event => {
            if(event){
                resolve(event);
            }else{
                reject(event);
            }
        })
    })
}

/**
 * Actualiza un evento por su ID
 */
exports.updateEvent = (event) => {
    eventDao.updateEvent(event._id, event);
}

exports.findAllEventsByCategory = (category, res) => {
    return new Promise((resolve, reject) => {
        eventDao.findAllEvents().then(events => {

            const chars = findAllCharacteristics(events, category);

            if(chars.length > 0){
                resolve(chars)    
            }else{
                reject(null);
            }
        })
    });
}

findAllCharacteristics = (events, category) => {
    return events.map(event => {
        const ev = event.characteristics.filter(characteristic => characteristic.category === category);
        if(ev != null && ev.length >= 0){
            return ev;
        }
    });
}

exports.findCategoryByEventId = params => {
    return new Promise((resolve, reject) => {
        eventDao.findEventById(params.id).then(event => {
            const chars = event.characteristics.filter( char => char.category === params.category);
            if(chars !=  null){
                resolve(chars);
            }else{
                reject(null);
            }
        });
    });
}

getMaximunValues = array => {
    const maxItem = {
        votes: 0
    };
    
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        
        if(item.votes >= maxItem.votes || maxItem.votes === 0){
            maxItem.votes = item.votes;
            maxItem.id = item.id;
            maxItem.value = item.value;
            maxItem.category = item.category;
        }
    }
    return maxItem;
}

getRules = array => {
    return array.filter(item => item.votes > 0);
}

exports.addCharacteristicsToEvent = updatedEvent => {
    return new Promise((resolve, reject) => {
        eventDao.updateEvent(updatedEvent._id, updatedEvent).then(event => {
            if(event){
                resolve(event);
            }else{
                reject(event);
            }
        })
    })
}

/**
 * Obtiene el máximo de votos por cada categoría
 */
exports.getMaxVotes = event => {

    const promise = new Promise((resolve, reject) => {
        const fullEvent = {};
        const characteristic = [];
        fullEvent.name = event.name;
        fullEvent.description = event.description;
        const obj = {};
        obj.id = event._id;
        obj.category = 'Lugar';
        this.findCategoryByEventId(obj).then(places => {
            const place = getMaximunValues(places);
            if(place){
                characteristic.push(place);
            }
            obj.category = 'Hora del evento';
            return this.findCategoryByEventId(obj);
        }).then(times => {
            const time = getMaximunValues(times);
            if(time){
                characteristic.push(time);
            }
            obj.category = 'Fecha del evento';
            return this.findCategoryByEventId(obj);
        }).then(dates => {
            const date = getMaximunValues(dates);
            if(date){
                characteristic.push(date);
            }
            obj.category = 'Regla';
            return this.findCategoryByEventId(obj);
        }).then(rules => {
            const rule = getRules(rules);
            if(rule.length > 0){
                characteristic.push({rules: rule});
            }
            fullEvent.characteristics = characteristic;
            return fullEventDao.saveFullEvent(fullEvent);
        }).then(finalEvent => {
            event.state = false;
            return eventDao.updateEvent(event._id, event)
        }).then(event => {
            if(event){
                resolve(fullEvent);
            }else{
                reject(false);
            }
        }).catch(err => console.log(err));
    })

    return promise;
}

/**
 * Guarda un evento cuya fecha de finalización ha sido superada
 */
saveFinalEvent = (event, res) => {
    return fullEventDao.saveFullEvent(event, res);
}

/**
 * Obtiene el número máximo en un erreglo.
 */
getMaxNumber = arr => {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

/**
 * Obtiene un voto por el ID
 */
exports.vote = obj => {
    return new Promise((resolve, reject) => {
        eventDao.updateEvent(obj._id, obj).then(obj => {
            console.log(obj);
            if(obj){
                resolve(obj);
            }else{
                reject(obj);
            } 
        });
    });
}

/**
 * Actualiza la votacíon por el valor votado
 */
updateVotation = (vote, obj, res) => {

    for (let key in obj) {
        const value = obj[key];
        if(value === 1){
            const sum = vote[key] + 1;
            vote[key] = sum;
        }
    }
    voteDao.findIdAndUpdateVote(vote._id, vote, res);
}

/**
 * Funcion encargada de guardar un voto
 */
saveVote = () => {
    return voteDao.saveVote(newObj);
}

/**
 * Guarda un objeto de votación
 */
vote = (id, obj) => {
    
    let newObj = {};
    
    for (let key in obj) {
      newObj[key] = 0;
    }
    newObj.id = id;
    return newObj;   
}