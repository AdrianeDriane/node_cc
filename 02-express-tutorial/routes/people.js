const express = require('express');
const router = express.Router();
let { people } = require('../data.js');

router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(201).send({ success: true, person: name });
  }

  res.status(400).send({ success: false, msg: 'Please provide name value' });
});

router.post('/postman', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .send({ success: false, msg: 'Please provide name value' });
  }

  res.status(201).send({ success: true, data: [...people, name] });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({
      success: false,
      msg: 'Please provide a value.',
    });
  }

  const foundPerson = people.find((person) => person.id.toString() === id);

  if (!foundPerson) {
    return res.status(404).send({
      success: false,
      msg: 'ID does not match any user in the system.',
    });
  }

  foundPerson.name = name;

  res.status(200).send({
    success: true,
    data: people,
  });
});

router.delete(':id', (req, res) => {
  const { id } = req.params;

  const foundPerson = people.find((person) => person.id.toString() === id);

  if (!foundPerson) {
    return res.status(404).send({
      success: false,
      msg: 'ID does not match any user in the system.',
    });
  }

  const updatedPeople = people.filter((person) => person.id.toString() !== id);

  res.status(200).send({
    success: true,
    data: updatedPeople,
  });
});

module.exports = router;
