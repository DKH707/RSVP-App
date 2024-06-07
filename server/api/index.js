import express from "express";
import cors from "cors";
import auth from "../routes/authorize.js";
import people from "../routes/people.js";
import information from '../routes/information.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/people", people);
app.use("/api/info", information)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
