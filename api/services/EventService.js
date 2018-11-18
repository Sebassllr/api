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
exports.updateEvents = (events, res) => {
    const date = new Date();
    return events.map(e => {
            const finishDate = new Date(e.closeVot);
            if(finishDate < date){
                updateEvent(e, res);
            }
        });
}

/**
 * Actualiza un evento por su ID
 */
exports.updateEvent = (event, res) => {
    voteDao.findVoteByEventId(event._id, res).then(vote => getMaxVotes(vote, event, res));
}

exports.findAllEventsByCategory = (category, res) => {

    eventDao.findAllEvents().then(events => {
        const chars = events.map(event => {
            const ev = event.characteristics.filter(characteristic => characteristic.category === category);
            if(ev != null){
                return ev;
            }
        })
        res.send(chars);
    });
}

/**
 * Obtiene el máximo de votos por cada categoría
 */
getMaxVotes = (vote, event, res) => {
    const characteristics = event.characteristics;

    let counts = {};
    let places = [];
    let finalDate = [];
    let finalHour = [];
    let rules = [];

    characteristics.forEach(x  => {
        
    });
    // const finalVote = {};

    // const dateArray = [vote["date1"], vote["date2"], vote["date3"]];
    // const eventDateArray = [event["date1"], event["date2"], event["date3"]];
    // const date = getMaxNumber(dateArray);
    // finalVote.date = eventDateArray[date];

    // const timeArray = [vote["time1"], vote["time2"], vote["time3"]];
    // const eventTimeArray = [event["time1"], event["time2"], event["time3"]];
    // const time = getMaxNumber(timeArray);
    // finalVote.time = eventTimeArray[time];

    // const placeArray = [vote["place1"], vote["place2"], vote["place3"]];
    // const eventPlaceArray = [event["place1"], event["place2"], event["place3"]];
    // const place = getMaxNumber(placeArray);
    // finalVote.place = eventPlaceArray[place];

    // finalVote.name = event.name;
    // finalVote.description = event.description;
    return saveFinalEvent(finalVote, res);
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
exports.getVote = (obj, res) => {
    voteDao.findVoteByEventId(obj.id).then( vote => updateVotation(vote, obj, res))
    .catch(except => console.log(except));    
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