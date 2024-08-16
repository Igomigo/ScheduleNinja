# ScheduleNinja

ScheduleNinja is an event scheduler application that integrates with the Google Calendar API to create and manage events directly on your Google Calendar. This app allows users to create events, schedule Google Meet meetings, and invite attendees, all through a simple and easy-to-use interface.

## Features

- **OAuth2 Authentication**: Securely authenticate users with Google OAuth2, allowing the app to access and manage their Google Calendar.
- **Create Events**: Easily create events on Google Calendar with details such as title, description, location, start and end times, and more.
- **Google Meet Integration**: Automatically generate Google Meet links for events, making it easier to schedule virtual meetings.
- **Attendee Management**: Add attendees to your events and send automatic updates to them via email.
- **Interactive API**: Simple REST API for creating and managing events.

## Getting Started

### Prerequisites

Before running the app, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- A Google Cloud project with OAuth 2.0 credentials set up

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/scheduleninja.git
    cd scheduleninja
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add your Google OAuth credentials:

    ```bash
    CLIENT_ID=your_google_client_id
    CLIENT_SECRET=your_google_client_secret
    REDIRECT_URL=http://localhost:5000/auth/redirect
    PORT=5000
    ```

4. Run the app:

    ```bash
    npm start
    ```

The server will start on `http://localhost:5000`.

### Authentication

To authenticate the app with Google, visit `http://localhost:5000/auth`. This will redirect you to Google's authentication page. After granting access, you will be redirected back to the app with authentication tokens set.

### API Endpoints

#### Root Route

- **`GET /`**: Returns a welcome message.

#### Create Event

- **`GET /create-event`**: Creates a predefined event with a Google Meet link. This is a demo route that uses hardcoded event data.

- **`POST /create-event`**:
  - **Description**: Creates a custom event on Google Calendar.
  - **Request Body**:
    - `summary` (string): The title of the event.
    - `location` (string): The location of the event.
    - `description` (string): A brief description of the event.
    - `startDate` (string): The start date and time in ISO format.
    - `endDate` (string): The end date and time in ISO format.
    - `timeZone` (string): The time zone for the event.
  - **Response**:
    - `status` (string): Status of the request.
    - `message` (string): Message indicating the event creation status.
    - `link` (string): Google Meet link for the event.

#### Authentication Routes

- **`GET /auth`**: Redirects the user to Google's authentication page.
- **`GET /auth/redirect`**: Handles the OAuth2 callback and sets up the user's credentials.

### Code Overview

#### `App.js`

- Sets up the Express server with middleware for logging (`morgan`), JSON parsing, and routing.
- Initializes the Google Calendar API using OAuth2 authentication.
- Includes routes for creating events and testing the server.
- The `create-event` route (currently using `GET` for demo purposes) allows for creating a predefined event with Google Meet integration.

#### `Auth.js`

- Handles the OAuth2 authentication flow with Google.
- Defines routes for starting the authentication process (`/auth`) and handling the OAuth2 callback (`/auth/redirect`).
- Sets the authenticated user's credentials for use with the Google Calendar API.

### Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Authenticate with Google by visiting:

    ```bash
    http://localhost:5000/auth
    ```

3. Create an event by visiting:

    ```bash
    http://localhost:5000/create-event
    ```

This will create a predefined event on your Google Calendar and return a Google Meet link.

### Contributing

Feel free to fork the repository and submit pull requests if you have any enhancements or bug fixes.

### Contact Me Here

[Twitter](https://x.com/Vikcentofficial)

[LinkedIn](https://www.linkedin.com/in/igomigo-fatai/)

Gmail Address: igomigofatai@gmail.com

### License

This project is licensed under the MIT License.