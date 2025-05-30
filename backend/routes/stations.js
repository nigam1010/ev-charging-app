const express = require('express');
const router = express.Router();
const {
  createStation,
  getStations,
  updateStation,
  deleteStation
} = require('../controllers/stationController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createStation);
router.get('/', auth, getStations);
router.put('/:id', auth, updateStation);
router.delete('/:id', auth, deleteStation);

module.exports = router;
