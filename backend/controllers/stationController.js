const ChargingStation = require('../models/ChargingStation');

// Create station
exports.createStation = async (req, res) => {
  try {
    const station = await ChargingStation.create(req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create station', error: err });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.findAll();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching stations', error: err });
  }
};

// Update station
exports.updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await ChargingStation.findByPk(id);
    if (!station) return res.status(404).json({ msg: 'Station not found' });

    await station.update(req.body);
    res.json(station);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating station', error: err });
  }
};

// Delete station
exports.deleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await ChargingStation.findByPk(id);
    if (!station) return res.status(404).json({ msg: 'Station not found' });

    await station.destroy();
    res.json({ msg: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting station', error: err });
  }
};
