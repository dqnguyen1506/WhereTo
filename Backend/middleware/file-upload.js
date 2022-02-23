const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 5000000, //file limite of 500,000b,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype]; //get the file extension
      cb(null, uuidv4() + "." + ext); //callback function to name the file
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; //converts to true/false
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid); //if error, returrn error, if not accept the file
  },
});

module.exports = fileUpload;
