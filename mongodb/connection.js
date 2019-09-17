const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/RNLEC", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("connected To Database"))
  .catch(error => {
    console.log("Went Wrong", error.message);
  });

let userschema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  courses: [String],
  date: { type: Date, default: Date.now },
  isPublished: { type: Boolean }
});

let UserModel = mongoose.model("user", userschema);

async function newuser() {
  let data = new UserModel({
    name: "Ani",
    author: "May",
    courses: ["Angular", "Express"],
    isPublished: true
  });
  let result = await data.save();
  console.log(result);
}
newuser();

// async function getalluser() {
//   let result = await UserModel.find()
//     /*{ price: { $gt: 10, $lt: 21 } }*/
//     /*{price:{$in:[10,20,30]}})*/
//     /* findById("5d7e859dc755791ee44c91b2") */
//     .sort("name")
//     .select(["name", "author"]);
//   /* .countDocuments().count() */
//   console.log(result);
// }
// getalluser();
