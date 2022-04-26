const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

require("dotenv").config({ path: ".env" });
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api",require("./Routes/database"));

app.listen(PORT, () => {
  console.log("Server is running on port :  " + PORT);
});