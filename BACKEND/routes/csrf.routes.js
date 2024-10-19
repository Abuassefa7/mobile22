const express = require("express");
const router = express.Router();

const csrfController = require("../controller/csrf.controller")
// get for csrf token
router.get("/csrf-token", csrfController.getCsrfToken);
// create a sample get route for test
router.get("/test", (req, res) => {
	console.log("test:",req.session);
	res.json({ message: "Hello from test route" });
}
)
	


// export module
module.exports = router;