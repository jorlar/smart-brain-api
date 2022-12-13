const { json } = require("body-parser");
const Clarifai = require("clarifai");
const { response } = require("express");

// Add your own API-key for your use
const app = new Clarifai.App({
  apiKey: "062cc9250b3e4ff39103530536af8f45",
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    response.json(data)
  })
  .catch(err => res.status(400).json('unable to work with api'))
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
      // entries[0] --> this used to return the entries
      // TO
      // entries[0].entries --> this now returns the entries
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = { handleImage: handleImage, handleApiCall:handleApiCall };
