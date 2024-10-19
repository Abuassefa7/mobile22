// Import the device service
const deviceService = require("../services/device.service");
// Create the add devcie controller
// async function createDevice(req, res, next) {
// 	// Check if device_make already exists in the database
// 	const deviceExists = await deviceService.checkIfDeviceExists(
// 		req.body.device_serial_number
// 	);
// 	if (deviceExists) {
// 		res.status(400).json({
// 			error: "This device is already registered!",
// 		});
// 	} else {
// 		try {
// 			const deviceData = req.body;

// 			// Create the device
// 			const device = await deviceService.createDevice(deviceData);
// 			if (device.status === "fail") {
// 				res.status(400).json({
// 					status: device.status,
// 					message: device.message,
// 				});
// 			} else {
// 				res.status(200).json({
// 					status: "true",
// 					device: device.message,
// 					owner: device.owner,
// 				});
// 			}
// 		} catch (error) {
// 			console.log(error);
// 			res.status(400).json({
// 				error: "Something went wrong!",
// 			});
// 		}
// 	}
// }
async function createDevice(req, res, next) {
	try {
		const { device_serial_number } = req.body;

		// Check if device already exists in the database
		const deviceExists = await deviceService.checkIfDeviceExists(
			device_serial_number
		);
		if (deviceExists) {
			return res.status(400).json({
				error: "This device is already registered!",
			});
		}

		// Create the device
		const device = await deviceService.createDevice(req.body);

		res.status(201).json({
			status: "success",
			device: device.message,
			owner: device.owner,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Something went wrong!",
		});
	}
}
// Create the update device controller
async function updateDevice(req, res, next) {
	try {
		const deviceId = req.params.device_id;
		const updates = req.body;
		const updatedDevice = await deviceService.updateDevice(deviceId, updates);

		if (updatedDevice.status === "fail") {
			res.status(404).json({
				status: updatedDevice.status,
				message: updatedDevice.message,
			});
		}

		res.status(200).json({
			status: "success",
			updatedInfo: updatedDevice.updates,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Create the get device by device_id controller
const getSingleDeviceById = async (req, res) => {
	try {
		const deviceId = req.params.id;
		const device = await deviceService.getSingleDeviceById(deviceId);

		if (!device) {
			return res.status(404).json({
				error: "device not found",
			});
		}

		res.status(200).json(device);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};
// Create the get device by customer_id controller
async function getDevicesPerCustomer(req, res, next) {
	try {
		const id = req.params.customer_id;
		const device = await deviceService.getDevicesPerCustomer(id);
		// If the device is not found
		if (device.status === "fail") {
			res.status(400).json({
				status: device.status,
				message: device.message,
			});
			return;
		}

		res.status(200).json(device);
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Export the createDevice controller
module.exports = {
	createDevice,
	updateDevice,
	getSingleDeviceById,
	getDevicesPerCustomer,
};
