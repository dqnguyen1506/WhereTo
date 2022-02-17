const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyD1CpsJIR-bOMlqc7u2rxYTJ5QpO-ijjbI";

async function getCoordsForAdress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  //valid (according to validator) user-inputted field but location cannot be found
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the spceificed address.",
      422
    ); //invalid input code
    throw error;
  }

  const coordinates = data.results[0].geometry.location; //retrieve location{lat: '', long: ''} object

  return coordinates;
}

module.exports = getCoordsForAdress;
