//import { Module } from "module";
//[Custom Middleware]
function user(req, res, next) {
  console.log("Hello");
  next();
}

module.exports = user;
