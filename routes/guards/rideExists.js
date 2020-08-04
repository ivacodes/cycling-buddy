const db = require("../../model/helper");

async function rideExists(req, res, next) {
  const { ride_id } = req.body;
  try {
    const results = await db(`select id from rides where id="${ride_id}"`);
    if (results.data.length) next();
    else return res.status(404).send({ msg: "Ride doesn't exist." });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = rideExists;
