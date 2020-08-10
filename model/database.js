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
    "DROP TABLE IF EXISTS `users`; /*!40101 SET @saved_cs_client     = @@character_set_client */; /*!50503 SET character_set_client = utf8mb4 */; CREATE TABLE `users` (   `id` int NOT NULL AUTO_INCREMENT,   `username` varchar(45) DEFAULT NULL,   PRIMARY KEY (`id`),   UNIQUE KEY `username_UNIQUE` (`username`) ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; /*!40101 SET character_set_client = @saved_cs_client */;  -- -- Dumping data for table `users` --  LOCK TABLES `users` WRITE; /*!40000 ALTER TABLE `users` DISABLE KEYS */; INSERT INTO `users` VALUES (1,'Iva'),(2,'Joe'),(3,'Petra'); /*!40000 ALTER TABLE `users` ENABLE KEYS */; UNLOCK TABLES;  -- -- Table structure for table `rides` --  DROP TABLE IF EXISTS `rides`; /*!40101 SET @saved_cs_client     = @@character_set_client */; /*!50503 SET character_set_client = utf8mb4 */; CREATE TABLE `rides` (   `id` int NOT NULL AUTO_INCREMENT,   `startdate` datetime DEFAULT NULL,   `startpoint` varchar(255) DEFAULT NULL,   `title` varchar(45) DEFAULT NULL,   `description` varchar(2000) DEFAULT NULL,   `iscompleted` tinyint DEFAULT '0',   `difficulty` varchar(255) DEFAULT NULL,   `terraintype` varchar(255) DEFAULT NULL,   `createdby` int DEFAULT NULL,   `lengthinkm` float DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `_idx` (`createdby`),   CONSTRAINT `fk_rides_users` FOREIGN KEY (`createdby`) REFERENCES `users` (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; /*!40101 SET character_set_client = @saved_cs_client */;  -- -- Dumping data for table `rides` --  LOCK TABLES `rides` WRITE; /*!40000 ALTER TABLE `rides` DISABLE KEYS */; INSERT INTO `rides` VALUES (1,'2020-08-14 12:00:00','Behind the football pitch','Through the woods','We're going to be riding through the woods.',0,'easy','mixed',3,10),(2,'2020-08-15 07:00:00','in front of Atlantic pub','Panoramic view of the Ocean','Saturday morning ride along the coast. All are welcome',0,'easy','road',3,35),(3,'2020-08-15 12:00:00','Joyces Knocknacarra','Practice through the city','Practice ride through the city streets. Beginners welcome. Reflective clothing and lights mandatory.',0,'beginner','road',3,20),(4,'2020-08-15 06:00:00','Glenlo Abbey Hotel entrance','Lake Corrib cruise','Route is around the lake, starting north from the hotel. No stops planned but afterwards we can get lunch and pints.',0,'not pro but serious','road',2,130),(5,'2020-08-21 10:00:00','Delphi resort trail start','Trail ride','Crank up those gears and brace yourself for this action-packed, adrenaline-pumping activity through Delphiâ€™s very own downhill mountain bike trails',0,'advanced','mixed',2,30),(6,'2020-08-13 11:00:00','around the corner','Ride','Just a sample ride',0,'easy','road',2,15),(7,'2020-08-14 20:00:00','in front of Atlantic pub','Riding into the sunset','Going west into the sunset',0,'advanced','road',2,100); /*!40000 ALTER TABLE `rides` ENABLE KEYS */; UNLOCK TABLES; /*!50003 SET @saved_cs_client      = @@character_set_client */ ; /*!50003 SET @saved_cs_results     = @@character_set_results */ ; /*!50003 SET @saved_col_connection = @@collation_connection */ ; /*!50003 SET character_set_client  = utf8mb4 */ ; /*!50003 SET character_set_results = utf8mb4 */ ; /*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ; /*!50003 SET @saved_sql_mode       = @@sql_mode */ ; /*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ; DELIMITER ;; /*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_rides_insert` AFTER INSERT ON `rides` FOR EACH ROW BEGIN -- 	SET @last_ride_id = LAST_INSERT_ID(); --     select createdby into @last_user_id from rides where id=@last_ride_id; --     insert into users_rides (user_id, ride_id) values (@last_user_id, @last_ride_id); insert into users_rides (user_id, ride_id) values (new.createdBy, new.id); END */;; DELIMITER ; /*!50003 SET sql_mode              = @saved_sql_mode */ ; /*!50003 SET character_set_client  = @saved_cs_client */ ; /*!50003 SET character_set_results = @saved_cs_results */ ; /*!50003 SET collation_connection  = @saved_col_connection */ ;  -- -- Table structure for table `users_rides` --  DROP TABLE IF EXISTS `users_rides`; /*!40101 SET @saved_cs_client     = @@character_set_client */; /*!50503 SET character_set_client = utf8mb4 */; CREATE TABLE `users_rides` (   `id` int NOT NULL AUTO_INCREMENT,   `user_id` int DEFAULT NULL,   `ride_id` int DEFAULT NULL,   PRIMARY KEY (`id`),   KEY `user_id_idx` (`user_id`),   KEY `ride_id_idx` (`ride_id`),   CONSTRAINT `fk_users_rides_rides` FOREIGN KEY (`ride_id`) REFERENCES `rides` (`id`),   CONSTRAINT `fk_users_rides_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; /*!40101 SET character_set_client = @saved_cs_client */;  -- -- Dumping data for table `users_rides` --  LOCK TABLES `users_rides` WRITE; /*!40000 ALTER TABLE `users_rides` DISABLE KEYS */; INSERT INTO `users_rides` VALUES (1,3,1),(2,3,2),(3,3,3),(4,2,4),(5,2,5),(6,2,6),(7,2,7); /*!40000 ALTER TABLE `users_rides` ENABLE KEYS */; UNLOCK TABLES; /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */; /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */; /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */; /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */; /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */; /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */; /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;  -- Dump completed on 2020-08-10 12:24:32 ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DB creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
