const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).json(
        "Welcome to ScheduleNinja, a ninja will attend to you shortly");
});

app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});