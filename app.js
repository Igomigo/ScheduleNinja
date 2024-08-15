const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const scopes = ["https://www.googleapis.com/auth/calendar"];

// Initialize OAuth2 client with environment variables.
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Create route to generate and redirect to Google authentication URL.
app.get("/auth", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    res.redirect(url);
});

// Implement callback route to handle OAuth2 redirect, exchange code for tokens, and set credentials.
app.get("/auth/redirect", async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);
        res.status(200).json(
        "Authentication successful! Please return to the console."
    );
    } catch (err) {
        res.status(500).json("Authentication failed.");
    }
});

// Create a basic root route with a welcome message.
app.get("/", (req, res) => {
    res.status(200).json(
        "Welcome to ScheduleNinja, it's time to schedule those Events");
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});