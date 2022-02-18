const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //speed up query w/ "unique"
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }], //one-to-many => 1 user many places
});

//make sure unique key (email in this case) is unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
