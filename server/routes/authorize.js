import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

import checkCode from "../utils/checkCode.js";
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get the code and check it
router.post("/", async (req, res) => {
  let collection = await db.collection("Authorize");
  let results = await collection.find({}).toArray();
  // res.send('code retrieved. . . ');
  let resp = checkCode(req.body, results);
  if (resp){
    res.status(200).send('Authorized. . . welcome!');
  }
  else {
    res.status(403).send('Incorrect Access Code. . . forbidden!');
  }
  
});

export default router;