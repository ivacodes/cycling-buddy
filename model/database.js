require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "cyclingbuddy",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE IF EXISTS `users_rides`; DROP TABLE IF EXISTS `rides`; DROP TABLE IF EXISTS `users`; CREATE TABLE `users` (   `id` int NOT NULL AUTO_INCREMENT,   `username` varchar(45) DEFAULT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `username_UNIQUE` (`username`) ); CREATE TABLE `rides` (   `id` int NOT NULL AUTO_INCREMENT,   `startdate` datetime DEFAULT NULL,   `startpoint` varchar(255) DEFAULT NULL,   `title` varchar(45) DEFAULT NULL,   `description` varchar(2000) DEFAULT NULL,   `iscompleted` tinyint DEFAULT '0',   `difficulty` varchar(255) DEFAULT NULL,   `terraintype` varchar(255) DEFAULT NULL,   `createdby` int DEFAULT NULL,   `lengthinkm` float DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `_idx` (`createdby`),   CONSTRAINT `fk_rides_users` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`) ); CREATE TABLE `users_rides` (   `id` int NOT NULL AUTO_INCREMENT,   `user_id` int DEFAULT NULL,   `ride_id` int DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `user_id_idx` (`user_id`),   KEY `ride_id_idx` (`ride_id`),   CONSTRAINT `fk_users_rides_rides` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`),   CONSTRAINT `fk_users_rides_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ); LOCK TABLES `users` WRITE; INSERT INTO `users` VALUES (1,'Iva'),(2,'Joe'),(3,'Petra'); UNLOCK TABLES; CREATE TRIGGER `after_rides_insert` AFTER INSERT ON `rides` FOR EACH ROW BEGIN insert into users_rides (user_id, ride_id) values (new.createdBy, new.id); END; LOCK TABLES `rides` WRITE; INSERT INTO `rides` VALUES (1,'2020-08-14 12:00:00','Behind the football pitch','Through the woods','We are going to be riding through the woods.',0,'easy','mixed',3,10),(2,'2020-08-15 07:00:00','in front of Atlantic pub','Panoramic view of the Ocean','Saturday morning ride along the coast. All are welcome',0,'easy','road',3,35),(3,'2020-08-15 12:00:00','Joyces Knocknacarra','Practice through the city','Practice ride through the city streets. Beginners welcome. Reflective clothing and lights mandatory.',0,'beginner','road',3,20),(4,'2020-08-15 06:00:00','Glenlo Abbey Hotel entrance','Lake Corrib cruise','Route is around the lake, starting north from the hotel. No stops planned but afterwards we can get lunch and pints.',0,'not pro but serious','road',2,130),(5,'2020-08-21 10:00:00','Delphi resort trail start','Trail ride','Crank up those gears and brace yourself for this action-packed, adrenaline-pumping activity through Delphiâ€™s very own downhill mountain bike trails',0,'advanced','mixed',2,30),(6,'2020-08-13 11:00:00','around the corner','Ride','Just a sample ride',0,'easy','road',2,15),(7,'2020-08-14 20:00:00','in front of Atlantic pub','Riding into the sunset','Going west into the sunset',0,'advanced','road',2,100),(8,'2020-08-11 12:00:00','Joyces Knocknacarra','Just for fun ride','This one is just for fun. Nothing planned',1,'easy','road',1,10),(9,'2020-08-12 12:00:00','around the corner','Example ride','Sprint',1,'advanced','road',1,10),(10,'2020-08-19 12:12:00','around the corner','Example ride','Sprint',1,'easy','road',1,10),(11,'2020-08-27 12:00:00','around the corner','Example ride','Sprint',1,'easy','road',1,10),(12,'2020-08-20 12:00:00','around the corner','Example ride 2','Please join me on this ride',1,'beginner','road',1,10),(13,'2020-08-12 12:00:00','around the corner','Title of example ride','Description of the ride',1,'easy','road',1,10),(14,'2020-08-20 12:00:00','around the corner','Example ride','Test',0,'beginner','road',1,10); UNLOCK TABLES;";
  // "DROP TABLE IF EXISTS `users`; CREATE TABLE `users` (   `id` int NOT NULL AUTO_INCREMENT,   `username` varchar(45) DEFAULT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `username_UNIQUE` (`username`) ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;  DROP TABLE IF EXISTS `rides`; CREATE TABLE `rides` (   `id` int NOT NULL AUTO_INCREMENT,   `startdate` datetime DEFAULT NULL,   `startpoint` varchar(255) DEFAULT NULL,   `title` varchar(45) DEFAULT NULL,   `description` varchar(2000) DEFAULT NULL,   `iscompleted` tinyint DEFAULT '0',   `difficulty` varchar(255) DEFAULT NULL,   `terraintype` varchar(255) DEFAULT NULL,   `createdby` int DEFAULT NULL,   `lengthinkm` float DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `_idx` (`createdby`),   CONSTRAINT `fk_rides_users` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;  DROP TABLE IF EXISTS `users_rides`; /*!50503 SET character_set_client = utf8mb4 */; CREATE TABLE `users_rides` (   `id` int NOT NULL AUTO_INCREMENT,   `user_id` int DEFAULT NULL,   `ride_id` int DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `user_id_idx` (`user_id`),   KEY `ride_id_idx` (`ride_id`),   CONSTRAINT `fk_users_rides_rides` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`),   CONSTRAINT `fk_users_rides_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; CREATE TRIGGER `after_rides_insert` AFTER INSERT ON `rides` FOR EACH ROW insert into users_rides (user_id, ride_id) values (new.createdBy, new.id);";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DB creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
