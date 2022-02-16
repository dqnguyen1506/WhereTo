const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  // path should only be the continuation of the path passed in from app (/api/places) + "/"
  const placeId = req.params.pid; // { pid: "p1"}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw (error = new HttpError(
      "Could not find a place for the provided place id.",
      404
    ));
  }

  res.json({ place }); // => { place } => { place: place} (automicatlly expand out the full json format)
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    //better for asynchronous code
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    ); //put in queue;
  }

  res.json(place);
};

const createPlace = (req, res, next) => {

};

//export multiple functions
exports.getPlaceById = getPlaceById; //pointer to function
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;

