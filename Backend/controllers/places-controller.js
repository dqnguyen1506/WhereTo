const { validationResult } = require("express-validator");
const fs = require("fs");

const HttpError = require("../models/http-error");
const getCoordsForAdress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  // path should only be the continuation of the path passed in from app (/api/places) + "/"
  const placeId = req.params.pid; // { pid: "p1"}

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );
    return next(error);
  }

  //place does not exist
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided place id.",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // .toObject() "_id" => "id"
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //find places by user id
  //   let places;
  let userWithPlaces;
  try {
    // places = await Place.find({ creator: userId }); Alternative
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try later.",
      500
    );
    return next(error);
  }

  //if userid doesnt exist or user doesnt have any place added yet
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    // OR if (!places || places.length === 0) {
    //better for asynchronous code
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    ); //put in queue;
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  //check result from express validator
  const errors = validationResult(req);
  //if there are errors violating any of the validators
  //throw an error
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data.", 422));
  }

  const { title, description, address } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAdress(address);
  } catch (error) {
    return next(error); //stop here if there's an error by return()
  }

  //create schema
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId, //referencing user Object id from User collection
  });

  //find userid in the database
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  //if user doesnt exist
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  // console.log(user);

  //save place to "places", placeId to user's places, but only if both operations succeed
  try {
    //start a session and transaction (reversible)
    const sess = await mongoose.startSession();
    sess.startTransaction();

    //save the place in the database
    await createdPlace.save({ session: sess });

    //establish a connection (adding place ObjectId to user.places) between user and place model => not a regular "push()"
    user.places.push(createdPlace);

    //save user to the database
    await user.save({ session: sess });

    //commit the change from the session, after no error are thrown before
    await sess.commitTransaction();

    //manually create "users" collection b/c collection is not automatically created through a session
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  //if there are no validation errors
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422);
    return next(new HttpError("Invalid inputs, please check your data.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(err);
  }

  //if the user is not the place's creator, throw error
  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  //authentication
  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place.",
      403
    );
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place.",
      500
    );
    return next(error);
  }

  //delete image in uploads/images
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place." });
};

//export multiple functions
exports.getPlaceById = getPlaceById; //pointer to function
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
