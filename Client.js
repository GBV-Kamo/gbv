const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
ClientSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Client", ClientSchema);
