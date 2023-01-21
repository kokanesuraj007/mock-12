"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var connection = require("./config/dbconnect");

var app = express();
var PORT = process.env.PORT;

var userRouter = require("./features/Users/UserRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', userRouter);
app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.send("New Backend for Mock_12 routes are 1./signup   2. /login");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(PORT, function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connection());

        case 2:
          console.log("http://localhost:".concat(PORT));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
//# sourceMappingURL=index.dev.js.map
