const db = require("../../model/helper");

async function userExistsRideCreation(req, res, next) {
  const { createdby } = req.body;
  try {
    const results = await db(`select id from users where id="${createdby}"`);
    if (results.data.length) next();
    else return res.status(404).send({ msg: "User doesn't exist." });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userExistsRideCreation;
