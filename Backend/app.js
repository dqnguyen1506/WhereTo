const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

//http request body parser into js objects => next(parsedBody)
app.use(bodyParser.json());

//express's middleware to serve/return the files in uploads & images folders
app.use("/uploads/images", express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //set allowed headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//register routes middlewares
app.use("/api/places", placesRoutes); // only forward request with path => /api/places/... to placesRoutes
app.use("/api/users", usersRoutes); //only forward request with path => /api/users/... to userRoutes

//default error handling middlware for requests w/o a response
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// error handling middleware fuction when an error was thrown ==> must include "error"
app.use((error, req, res, next) => {
  //if there is a file ==> when there's sign up error ==> delete the newly uploaded file
  if (req.file) {
    //delete the file
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  //if response sent, cannot do anything because cannot send more than responses
  if (res.headerSent) {
    return next(error); //forward the error to next middleware
  }
  //no response sent
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

//if database connection is successful, start express server
mongoose
  .connect(
    "mongodb+srv://dungqnguyen1506:dung123456@cluster0.auyhf.mongodb.net/WhereTo?retryWrites=true&w=majority"
  )
  .then(() => {
    //server on port 5000
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
