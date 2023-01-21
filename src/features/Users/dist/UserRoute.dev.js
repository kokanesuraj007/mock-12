"use strict";

var express = require('express');

var JWT = require("jsonwebtoken");

var argon2 = require("argon2");

var UserModel = require("../Models/UserModel");

var router = express.Router();
router.post('/signup', function _callee(req, res) {
  var _req$body, name, email, password, hash, userexist, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(argon2.hash(password));

        case 3:
          hash = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(UserModel.findOne({
            email: email
          }));

        case 6:
          userexist = _context.sent;
          _context.prev = 7;

          if (!userexist) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: "User already exist, Please enter different email"
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(UserModel.create({
            name: name,
            email: email,
            password: hash
          }));

        case 12:
          newUser = _context.sent;
          newUser.save();
          return _context.abrupt("return", res.status(201).send({
            message: "User created successfully"
          }));

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](7);
          return _context.abrupt("return", res.status(404).send({
            message: _context.t0.message
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 17]]);
});
var REFRESHKEY = "REFRESH12";
var SECRETKEY = "MOCK12";
router.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, token, refreshToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(UserModel.findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(argon2.verify(user.password, password));

        case 7:
          if (!_context2.sent) {
            _context2.next = 11;
            break;
          }

          token = JWT.sign({
            id: user._id,
            name: user.name
          }, SECRETKEY, {
            expiresIn: "7 days"
          });
          refreshToken = JWT.sign({
            id: user._id,
            name: user.name
          }, REFRESHKEY, {
            expiresIn: "28 days"
          });
          return _context2.abrupt("return", res.status(200).send({
            message: "Login successfully",
            token: token,
            refreshToken: refreshToken,
            email: user.email
          }));

        case 11:
          return _context2.abrupt("return", res.status(401).send("Invalid Credentials or User is not Registerd"));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/logout', function (req, res) {
  var token = req.headers['authorization'];

  try {
    return res.status(200).send({
      message: "Logout Successfull"
    });
  } catch (error) {
    return res.status(404).send({
      message: error.message
    });
  }
});
module.exports = router;
//# sourceMappingURL=UserRoute.dev.js.map
