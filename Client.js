const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  customerId: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
