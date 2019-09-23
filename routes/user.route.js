const Joi = require('@hapi/joi'); /// important

const express = require("express");

const router = express.Router();

let users = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" }
];

//[1]

router.get("/api/first", (req, res) => {
  res.send("hello");
});

//[2]

// app.get("/api/first/:id", (req, res) => {
//   let id = req.params.id;
//   res.send(id);
// });

//[3]
router.get("/user", (req, res) => {
  res.send(users);
});

//[4]
router.get("/first/:id", (req, res) => {
  //   let id = req.params.id;
  let user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) {
    {
      return res.status(403).send({ message: "invalid" });
    }
  }
  res.send(user);
});

//[5]
router.post("/newuser", (req, res) => {
  // let us = Joi.object().keys({
  //   name: Joi.string().min(4)
  // });
  //let result = Joi.validate(req.body, us);
  // console.log(result);
  // if (result.error) {
  //   return res.status(402).send(result.error.details[0].message);
  // }

  // let { error } = Joi.validate(req.body, us);
  // if (error) {
  //   return res.status(402).send(error.details[0].message);
  // }

  let { error } = wholevalidation(req.body);
  if (error) {
    return res.status(402).send(error.details[0].message);
  }

  let navin = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(navin);
  res.send(users);
});

//[6]
router.put("/updateuser/:id", (req, res) => {
  let user = users.find(item => item.id === parseInt(req.params.id));

  let { error } = wholevalidation(req.body);

  if (error) {
    return res.status(402).send(error.details[0].message);
  }
  if (!user) {
    {
      return res.status(403).send({ message: "invalid" });
    }
  }
  user.name = req.body.name;
  res.send(user);
});

//[7]
router.delete("/removeuser/:id", (req, res) => {
  let user = users.find(item => item.id === parseInt(req.params.id));
  if (!user) {
    {
      return res.status(403).send({ message: "invalid" });
    }
  }
  let index = users.indexOf(user);
  let data = users.splice(index, 1);
  res.send("Delete");
});

/*
Now Router Is Wrapping Whole API(router.get/router.post/router.put/router.delete)
Router Has Scope Of Availability To Access this API 
*/

function wholevalidation(msg) {
  let us = Joi.object().keys({
    name: Joi.string().min(4)
  });
  return Joi.validate(msg, us);
}
module.exports = router;
