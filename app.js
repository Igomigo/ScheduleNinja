const express = require("express");
const {oauth2Client, router} = require("./auth");

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/", router);

// Create a basic root route with a welcome message.
app.get("/", (req, res) => {
    res.status(200).json(
        "Welcome to ScheduleNinja, it's time to schedule those Events");
});

// Initialize the google calendar API
const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
});

// Schedule events on the google calendar

// Start the server
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});