const express = require('express');
const rol = require('../controllers/EventController');

const router = express.Router();

router.get('/evento/', rol.findAll);
router.get('/propuesta/', rol.findAllProps);
router.get('/getByCategory/', rol.findByCategory);
router.get('/getByCategoryByEventId/', rol.findCharacteristicByEventId);
router.get('/evento/findFinalizedEvents', rol.findAllFinalizeEvents);
router.post('/evento/', rol.create);
router.post('/evento/Vote', rol.updateVote);
router.post('/evento/FinalVote', rol.closeVotation);
router.post('/evento/updateEvent', rol.updateEvent);

module.exports = router