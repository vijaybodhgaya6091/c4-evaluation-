const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://vijay:kumar@cluster0.fqrluxf.mongodb.net/socialDb?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
