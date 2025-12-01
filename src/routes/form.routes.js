const router = require('express').Router();
const controller = require('../controllers/form.controller.js');
const auth = require('../middleware/auth.js');
const adminAuth = require('../middleware/adminAuth.js');


// Admin: create/update/delete
router.post('/', auth, adminAuth, controller.createForm);
router.put('/:id', auth, adminAuth, controller.updateForm);
router.delete('/:id', auth, adminAuth, controller.deleteForm);


// Public api
router.get('/', controller.getForms);
router.get('/:id', controller.getForm);
module.exports = router;
