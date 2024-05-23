const router = require("express").Router();
const { signin, signup } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
