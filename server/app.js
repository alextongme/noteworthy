require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// ROUTES
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/notes");
const notebooksRoute = require("./routes/notebooks");
const tagsRoute = require("./routes/tags");
const usersRoute = require("./routes/users");

const port = PORT || 3001;

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// STATIC FILES (production: serve webpack build from dist/)
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// API ROUTES
app.use("/api/auth", authRoute);
app.use("/api/notes", notesRoute);
app.use("/api/notebooks", notebooksRoute);
app.use("/api/tags", tagsRoute);
app.use("/api/user", usersRoute);

// SPA CATCH-ALL: serve index.html for all non-API routes
app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

// SERVER
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
