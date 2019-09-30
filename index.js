const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 4000;
const config = require("config");
const mongoose=require('mongoose')
const movies=require('./routes/movie.route')
const userroute = require("./routes/user.route");
const middleware = require("./middleware/user");
const genre=require('./routes/genre.route')
const autho=require('./auth/auth')
const fileupload=require('./routes/fileupload.route')
const registration=require('./routes/registration.route')
const mailer =require('./routes/nodemailer')
app.use(express.json());


if(!config.get('jwtprivatekey')){
console.error('Private key is not set!!!!!!');                          // First Ask For Private key.
process.exit(1)
}

if (config.get("host.mail") === "Development Mode") {
  app.use(morgan("tiny"));                                              //Give details About request(api/user).
}

//[1 way]
// if (config.get("host.mail") === "Development Mode") {
//   console.log(config.get("password"));                               //Give details About request(api/user).
// }

//[2 way]
if (process.env.NODE_ENV === "development") {
  console.log(config.get("password"));                                  //Give details About request(api/user).
}
//console.log("password: " + config.get("password"));

// console.log(  "Production Mode: " + process.env.NODE_ENV + " Developement Mode: " + app.set("env"));
// console.log("mode: ", config.get("host.mail"));

mongoose.connect("mongodb://localhost/RNLEC",{
    useUnifiedTopology: true,
    useNewUrlParser: true
  })                                                                     //Mongo Centralize Localhost.......
  .then(()=>{
            console.log("Connection Successful....Intializing..");
            })
  .catch(()=>{
            console.log("Connection Unsccessful....Terminating...");   
            })

app.use(middleware);
app.use('/uploads',express.static('uploads'));
app.use("/api", userroute);
app.use("/api/movie",genre);
app.use("/api/movie",movies);
app.use("/api",registration)
app.use("/api",autho);
app.use("/api",mailer)
app.use("/api/up",fileupload);

app.listen(port, () => {
  console.log("Server is working on port" + port);
});