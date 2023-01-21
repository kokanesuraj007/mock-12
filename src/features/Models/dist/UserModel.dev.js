"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var UserModel = model("user", UserSchema);
module.exports = UserModel;
//# sourceMappingURL=UserModel.dev.js.map
