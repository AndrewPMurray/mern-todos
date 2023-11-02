# MERN ToDos

### A stylized app using the full MERN stack: MongoDB, Express, React, and Node

To launch the application:

-   Clone the git:
    -   https://github.com/AndrewPMurray/mern-todos.git
-   Inside the main git folder (where the frontend and backend folders are located) run npm install to install all dependencies.
-   In the backend folder, use the .env.example to set up your .env file. (Make sure to generate a secure JWT token and use a secure password for your database)
-   For the `PORT` .env variable, it is recommended to use `5000`
-   For the `MongoDB_URI` .env variable, you will need to generate a URL to connect to your database on MongoDB Atlas. You can create an atlas account and database for free [here](https://www.mongodb.com/atlas/database)
-   To run the backend server, run the following from the root folder: `npm start`
-   To run the frontend server, cd into the frontend folder and run: `npm start`

### Notes

-   If the backend server terminates due to not being able to connect to MongoDB, check the URI in your .env file and ensure that it is correct. The URL should begin with `mongodb+srv://`

### Technologies used:

-   Frontend:
    -   React
    -   Redux
-   Backend
    -   Express
    -   MongoDB
