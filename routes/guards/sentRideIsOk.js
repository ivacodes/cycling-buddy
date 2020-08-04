const db = require("../model/helper");

async function sentRideIsOk(req, res, next) {
  const {
    startdate,
    startpoint,
    title,
    description,
    difficulty,
    terraintype,
    lengthinkm,
    createdby,
  } = req.body;

  try {
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = sentRideIsOk;
