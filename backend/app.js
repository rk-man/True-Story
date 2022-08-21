const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

//importing Routers
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

//accessing static files
app.use(express.static(path.join(__dirname, "public")));

// body parser and other necessities
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(errorHandler);

module.exports = app;
