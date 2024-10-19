let express = require("express");
const path = require("path");
let router = express.Router();

// Import the install routes
let installRouter = require("./install.routes");
// Import the employee routes
const employeeRouter = require("./employee.routes");
// Import the login routes
const loginRoutes = require("./login.routes");
// Import the customer routes
const customerRoutes = require("./customer.routes");
// // Import the order routes
const orderRoutes = require("./order.routes");
// // Import the service routes
const serviceRoutes = require("./service.routes");
// // Import the ria routes
const riaRoutes = require("./ria.routes");
// // Import the rent routes
const rentRoutes = require("./rent.routes");
// // Import the device routes
const deviceRoutes = require("./device.routes");
// // Import the product routes
const productRoutes = require("./product.routes");
// Import the csrf routes
const csrfRoutes = require("./csrf.routes");
// // Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the customer routes to the main router
router.use(customerRoutes);
// // Add the order routes to the main router
router.use(orderRoutes);
// // Add the service routes to the main router
router.use(serviceRoutes);
// Add the ria routes to the main router
router.use(riaRoutes);
// Add the rent routes to the main router
router.use(rentRoutes);
// // Add the device routes to the main router
router.use(deviceRoutes);
router.use(
	"/api/uploads",
	express.static(path.join(__dirname, "../../Uploads/"))
);
// Add the product routes to the main router
router.use(productRoutes);
// user csrf route
router.use(csrfRoutes);
// export router
module.exports = router;
