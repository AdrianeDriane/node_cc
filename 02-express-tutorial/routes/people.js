const express = require('express');
const router = express.Router();
const {
  createPerson,
  createPersonPostman,
  deletePerson,
  getPeople,
  updatePerson,
} = require('../controllers/peopleController.js');

router.get('/', getPeople);
router.post('/', createPerson);
router.post('/postman', createPersonPostman);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

// hard to read, i prefer the one above
// router.route('/').get(getPeople).post(createPerson);
// router.route('/postman').post(createPersonPostman);
// router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
