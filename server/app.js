require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { PORT, CLIENT_URL, SERVER_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// ROUTES
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");
// const notebooksRoute = require("./routes/notebooks");
// const tagsRoute = require("./routes/tags");
// const usersRoute = require("./routes/users");

const port = PORT || 3001;

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize())

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);
// app.use("/api/notebooks", notebooksRoute)
// app.use("/api/tags", tagsRoute)
// app.use("/api/users", usersRoute)

// SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port} and can be accessed at ${SERVER_URL}`);
});