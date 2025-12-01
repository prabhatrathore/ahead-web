const express = require("express");
const router = express.Router();

const fieldController = require("../controllers/field.controller.js");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.post("/", auth, adminAuth, fieldController.create);
router.get("/:formId", fieldController.getAll);
router.put("/:id", auth, adminAuth, fieldController.update);
router.delete("/:id", auth, adminAuth, fieldController.delete);

module.exports = router;
