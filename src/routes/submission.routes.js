const router = require('express').Router();
const controller = require('../controllers/submission.controller.js');
const auth = require('../middleware/auth.js');
const adminAuth = require('../middleware/adminAuth.js');

router.post('/', controller.submitForm);

router.get('/', /*auth, adminAuth,*/ controller.listSubmissions);

module.exports = router;
