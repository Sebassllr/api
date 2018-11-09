const express = require('express');
const rol = require('../controllers/EventController');

const router = express.Router();

router.get('/evento/', rol.findAll);
router.post('/evento/', rol.create);
router.post('/evento/Vote', rol.updateVote);
router.post('/evento/FinalVote', rol.closeEvent);

module.exports = router