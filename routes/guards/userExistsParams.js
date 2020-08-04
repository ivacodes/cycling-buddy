const db = require("../../model/helper");

async function userExistsParams(req, res, next) {
  const { user_id } = req.params;
  try {
    const results = await db(`select id from users where id="${user_id}"`);
    if (results.data.length) next();
    else return res.status(404).send({ msg: "User doesn't exist." });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userExistsParams;
