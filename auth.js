// Set up the OAuth2 authentication flow to authenticate the router with google
const { google } = require("googleapis");
const dotenv = require("dotenv");
const express = require("express");

const router = express.Router();

dotenv.config();

const scopes = ["https://www.googleapis.com/auth/calendar"];

// Initialize OAuth2 client with environment variables.
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Create route to generate and redirect to Google authentication URL.
router.get("/auth", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    res.redirect(url);
});

// Implement callback route to handle OAuth2 redirect, exchange code for tokens, and set credentials.
router.get("/auth/redirect", async (req, res) => {
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

module.exports = {oauth2Client, router};