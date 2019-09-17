const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 4000;
const config = require("config");
const userroute = require("./routes/user.route");
const middleware = require("./middleware/user");
app.use(express.json());
if (config.get("host.mail") === "Development Mode") {
  app.use(morgan("tiny")); ///Give details About request(api/user)
}
//[1 way]
// if (config.get("host.mail") === "Development Mode") {
//   console.log(config.get("password")); ///Give details About request(api/user)
// }
//[2 way]
if (process.env.NODE_ENV === "development") {
  console.log(config.get("password")); ///Give details About request(api/user)
}
//console.log("password: " + config.get("password"));

app.use(middleware);
// console.log(
//   "Production Mode: " +
//     process.env.NODE_ENV +
//     " Developement Mode: " +
//     app.set("env")
// );
//console.log("mode: ", config.get("host.mail"));

app.use("/api", userroute);
app.listen(port, () => {
  console.log("Server is working on port" + port);
});