var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

selectAllRides = () => {
  return db("select * from rides where iscompleted=0 ORDER BY id ASC;");
};
selectAllUsers = () => {
  return db("select * from users order by id asc;");
};

/* GET welcome page. */
router.get("/", function (req, res, next) {
  res.send("Welcome! /rides for rides /users for users");
});

/* GET all rides */
router.get("/rides", async (req, res, next) => {
  try {
    const results = await selectAllRides();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST new ride and get back refreshed list of rides*/
router.post("/rides", async (req, res, next) => {
  // add guard here to check body
  // add way to escape quotes in strings
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
    await db(
      `insert into rides (startdate, startpoint, title, description, difficulty, terraintype, lengthinkm, createdBy) values ('${startdate}', '${startpoint}', '${title}', '${description}', '${difficulty}', '${terraintype}', ${lengthinkm}, ${createdby});`
    );
    const results = await selectAllRides();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET all rides associated with user based on id*/

router.get("/usersrides/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const results = await db(
      `select title, description, startdate, startpoint, terraintype, difficulty, lengthinkm, iscompleted, rides.id as ride_id from users_rides inner join users on users_rides.user_id=users.id inner join rides on users_rides.ride_id=rides.id where users.id='${user_id}';`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*POST in users_rides when user joins a ride*/

router.post("/usersrides", async (req, res, next) => {
  // body check here
  const { user_id, ride_id } = req.body;
  try {
    await db(
      `insert into users_rides (user_id, ride_id) values ('${user_id}','${ride_id}')`
    );
    res.status(200).send("user ride link inserted");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET list of users */
router.get("/users", async (req, res, next) => {
  try {
    const results = await selectAllUsers();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST create user and send back refreshed list of users*/
router.post("/users", async (req, res, next) => {
  // body check here
  const { username } = req.body;
  try {
    await db(`insert into users (username) values ('${username}')`);
    const results = await selectAllUsers();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* OPTIONAL - implement later maybe 
when deleting/completing a ride set iscompleted=0*/

module.exports = router;
