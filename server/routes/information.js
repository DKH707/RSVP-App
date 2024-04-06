import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// router is an instance of the express router.
// We use it to define our routes.
const router = express.Router();

router.post("/", async (req, res) => {
  let collection = await db.collection("Information");
  collection.find({}).toArray()
  .then((results)=>{
    res.send(results).status(200);
  })
  .catch((error)=>{
    console.log(error)
    res.status(403);
  });
  
});

export default router;