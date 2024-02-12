const express = require('express');
const app = express();
let { people } = require('./data.js');

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(201).send({ success: true, person: name });
  }

  res.status(400).send({ success: false, msg: 'Please provide name value' });
});

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .send({ success: false, msg: 'Please provide name value' });
  }

  res.status(201).send({ success: true, data: [...people, name] });
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome, ${name}!`);
  }

  res.status(401).send('Please provide credentials!');
  // res.send(`Welcome, ${req.body.name}`);
});

app.put('/api/people/:id', (req, res) => {
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

app.delete('/api/people/:id', (req, res) => {
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

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
