var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");
const userExistsRideCreation = require("./guards/userExistsRideCreation");
const rideExists = require("./guards/rideExists");
const userExists = require("./guards/userExists");
const userExistsParams = require("./guards/userExistsParams");

router.use(bodyParser.json()); //check what does this do

selectAllRides = () => {
  return db("select * from rides where iscompleted=0 ORDER BY id ASC;");
};
selectAllUsers = () => {
  return db("select * from users order by id asc;");
};

/* GET welcome page. */
router.get("/", function (req, res) {
  res.send("Welcome! /rides for rides /users for users /usersrides for fun");
});

/* GET all rides */
router.get("/rides", async (req, res) => {
  try {
    const results = await selectAllRides();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST new ride and get back refreshed list of rides*/
router.post("/rides", userExistsRideCreation, async (req, res) => {
  // add way to escape quotes in strings - send \\' instead, json likes it
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
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET all rides associated with user based on id*/
router.get("/usersrides/:user_id", userExistsParams, async (req, res) => {
  const { user_id } = req.params;
  try {
    const results = await db(
      `select distinct title, description, startdate, startpoint, terraintype, difficulty, lengthinkm, iscompleted, rides.id as ride_id, createdby from users_rides inner join users on users_rides.user_id=users.id inner join rides on users_rides.ride_id=rides.id where users.id='${user_id}' and rides.iscompleted=0;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*POST in users_rides when user joins a ride*/
router.post("/usersrides", rideExists, userExists, async (req, res) => {
  const { user_id, ride_id } = req.body;
  try {
    await db(
      `insert into users_rides (user_id, ride_id) values ('${user_id}','${ride_id}')`
    );
    res.status(201).send("user ride link inserted");
  } catch (err) {
    res.status(500).send(err);
  }
});

/*remove from rides (iscompleted=1) when user is creator, get updated list back*/
router.put("/rides", rideExists, userExists, async (req, res) => {
  const { user_id, ride_id } = req.body;
  try {
    console.log("in the put in rides");
    await db(
      `update rides set iscompleted=1 where id=${ride_id} and createdby=${user_id}`
    );
    const results = await db(
      `select distinct title, description, startdate, startpoint, terraintype, difficulty, lengthinkm, iscompleted, rides.id as ride_id from users_rides inner join users on users_rides.user_id=users.id inner join rides on users_rides.ride_id=rides.id where users.id='${user_id}' and rides.iscompleted=0;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*remove from usersrides when user is not creator, get updated list back*/
router.delete("/usersrides", rideExists, userExists, async (req, res) => {
  const { user_id, ride_id } = req.body;
  try {
    await db(
      `delete from users_rides where user_id=${user_id} and ride_id=${ride_id};`
    );
    const results = await db(
      `select distinct title, description, startdate, startpoint, terraintype, difficulty, lengthinkm, iscompleted, rides.id as ride_id from users_rides inner join users on users_rides.user_id=users.id inner join rides on users_rides.ride_id=rides.id where users.id='${user_id}' and rides.iscompleted=0;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET list of users */
router.get("/users", async (req, res) => {
  try {
    const results = await selectAllUsers();
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* POST create user and send back refreshed list of users*/
router.post("/users", async (req, res) => {
  if (req.body.username) {
    const { username } = req.body;
    try {
      await db(`insert into users (username) values ('${username}')`);
      const results = await selectAllUsers();
      res.status(201).send(results.data);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send({ msg: "send some body" });
  }
});

/* OPTIONAL - implement later maybe 
when deleting/completing a ride set iscompleted=0*/

module.exports = router;
