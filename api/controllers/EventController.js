const mongoose = require('mongoose')
const EventP = mongoose.model('Event')
const utils = require('../handlers/utils')

exports.findAll = function(req, res){
    EventP.find({}).exec(function(err, evento) {
        utils.show(res, err, evento)
    })
}

exports.create = function(req, res) {
    const event = req.body;
    console.log(req);
    const toSaveEvent = new EventP({...event});
  
    toSaveEvent.save(function(err, toSaveEvent) {
      utils.show(res, err, toSaveEvent)
    });
}