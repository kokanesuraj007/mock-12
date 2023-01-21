"use strict";

var mongoose = require("mongoose");

require("dotenv").config();

var connection = function connection() {
  return regeneratorRuntime.async(function connection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mongoose.set('strictQuery', true);
          mongoose.connect(process.env.URL).then(function () {
            return console.log("mongoDB connected successfully");
          })["catch"](function (e) {
            return console.log(e);
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = connection;
//# sourceMappingURL=dbconnect.dev.js.map
