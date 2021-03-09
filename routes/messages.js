var express = require("express");
const { valid } = require("joi");
var router = express.Router();
const Joi = require("joi");

const Message = require("../models/message");

/* GET messages listing. */
router.get("/", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

/* GET a message by ts */
router.get("/:ts", function (req, res, next) {
  Message.findByPk(req.params.ts).then((result) => {
    if (result === null)
      return res
        .status(404)
        .send("A message with the given timestamp was not found.");
    res.send(result);
  });
  /*const msg = msgs.find((item) => item.ts === parseInt(req.params.ts));
  if (!msg)
    return res.status(404).send("The message with the given ts was not found.");
  res.send(msg);*/
});

/* Post a new message */
router.post("/", function (req, res, next) {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Desestructuración para guardar los parámetros del body
  const { message, author } = req.body;
  const ts = Date.now();

  Message.create({ message, author, ts }).then((response) => {
    res.send(response);
  });

  /*
  const msg = {
    message: req.body.message,
    author: req.body.author,
    ts: req.body.ts,
  };
  msgs.push(msg);
  res.send(msg);
  */
});

/* Update a message with the given ts */
router.put("/:ts", function (req, res, next) {
  /*
  // Message exists?
  const msg = msgs.find((item) => item.ts === parseInt(req.params.ts));
  if (!msg)
    return res.status(404).send("The message with the given ts was not found.");
  */

  // Body is correct?
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Message.update(req.body, {
    where: { ts: req.params.ts },
  }).then((result) => {
    if (result[0] === 0)
      return res
        .status(404)
        .send("A message with the given timestamp was not found.");
    res.status(200).send("Message updated!");
  });

  /*
  // Update the messages list
  msg.message = req.body.message;
  msg.author = req.body.author;
  res.send(msg);
  */
});

/* Delete a message with the given ts */
router.delete("/:ts", function (req, res, next) {
  /*const msg = msgs.find((item) => item.ts === parseInt(req.params.ts));
  if (!msg)
    return res.status(404).send("The message with the given ts was not found.");

  const index = msgs.indexOf(msg);
  msgs.splice(index, 1);*/

  Message.destroy({ where: { ts: req.params.ts } }).then((result) => {
    if (result === 0)
      return res
        .status(404)
        .send("A message with the given timestamp was not found.");
    res.status(204).send();
  });
});

function validateMessage(message) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required().pattern(new RegExp("^[A-z A-z]+")),
  });

  return schema.validate(message);
}

module.exports = router;
