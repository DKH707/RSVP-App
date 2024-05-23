import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you post a person to the db
router.post("/", async (req, res) => {
    try {
        let newDocument = {
          plannedAttendance: req.body.plannedAttendance,  
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          people: req.body.people,
          note: req.body.note
        };
        let collection = await db.collection("PublicPeople");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
      } catch (err) {
        console.error(err);
        res.send("Error adding record").status(500);
      }
});

export default router;