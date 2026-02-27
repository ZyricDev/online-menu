const { Router } = require("express");

const validate = require("../../../middlewares/validateMiddleware");
const authValidation = require("./auth.validation");
const authController = require("./auth.controller");

const router = Router();

router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
