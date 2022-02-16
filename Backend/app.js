const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

//http request body parser into js objects => next(parsedBody)
app.use(bodyParser.json());

//register route middlewares
app.use("/api/places", placesRoutes); // only forward request with path => /api/places/... to placesRoutes

// error handling middleware fuction
app.use((error, req, res, next) => {
  //if response sent => no error
  if (res.headerSent) {
    return next(error); //move on next error in queue
  }
  //handle error
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

//server on port 5000
app.listen(5000);
