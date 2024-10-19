const multer = require("multer");
const path = require("path");
const destination = path.join(__dirname, "../../Uploads/");

// Set up Multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, destination); // Specify the the i ages directory
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`); // Generate a unique filename
	},
});

// Initialize Multer
const upload = multer({ storage: storage });

module.exports = upload;
