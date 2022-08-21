const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 5000;

const DB_CON_STRING = process.env.DB_CON_STRING.replace(
    "<password>",
    "Naveen2003"
);

mongoose
    .connect(DB_CON_STRING)
    .then(() => {
        console.log("DB connection successfull");
    })
    .catch((err) => {
        console.log(err);
    });

const app = require("./app");

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        );
    });
}

app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
});
