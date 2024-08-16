const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv").config();
const { google } = require("googleapis");
const {oauth2Client, router} = require("./auth"); 

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", router);

// Create a basic root route with a welcome message.
app.get("/", (req, res) => {
    res.status(200).json(
        "Welcome to ScheduleNinja, it's time to schedule those Events");
});

// -------------- Interact with google calendar API --------------

// Initialize the google calendar API
const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
});

// Create events and google meet meetings on the google calendar
const event = {
    summary: "Let's talk Tech",
    location: 'Google Meet',

    description: "Demo event for the Tech Conference.",
    start: {
        dateTime: "2024-08-23T20:00:00+05:30",
        timeZone: 'Africa/Lagos'
    },
    end: {
        dateTime: "2024-08-23T21:00:00+05:30",
        timeZone: 'Africa/Lagos'
    },
    colorId: 1,
    conferenceData: {
        createRequest: {
            requestId: uuidv4(),
        }
    },
    attendees: [
        {email: "amfatai4real@gmail.com"},
        {email: "dasoftengineer@gmail.com"}
    ],
};

//app.post("./create-event", async (req, res) => {
    // Handles POST request to create a google calendar event
    try {
        const {
            summary, location, description, startDate, endDate,
            timeZone
        } = req.body;
        // Construct the event object
        const event = {
            summary: summary,
            location: location,

            description: description,
            start: {
                dateTime: startDate,
                timeZone: timeZone
            },
            end: {
                dateTime: endDate,
                timeZone: timeZone
            },
            colorId: 1,
            conferenceData: {
                createRequest: {
                    requestId: uuidv4(),
                }
            }
        }

        const result = await calendar.events.insert({
            calendarId: "primary",
            auth: oauth2Client,
            conferenceDataVersion: 1,
            sendUpdates: "all",
            resource: event
        });

        res.status(201).json({
            status: "success",
            message: `Created: ${summary}`,
            link: result.data.hangoutLink
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
//});

app.get("/create-event", async (req, res) => {
    try {
        const result = await calendar.events.insert({
            calendarId: "primary",
            auth: oauth2Client,
            conferenceDataVersion: 1,
            sendUpdates: "all",
            resource: event
        });
        res.status(200).json({
            status: "success",
            message: "Event Created",
            link: result.data.hangoutLink
        });
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});


// -------------- Start the server -----------------
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});