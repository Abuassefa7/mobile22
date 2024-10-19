// Import the query function from the db.config.js file
const conn = require("../config/db.config");

// A function to check if device exists in the database
async function checkIfDeviceExists(device_serial_number) {
	const query =
		"SELECT * FROM customer_device_info WHERE device_serial_number = $1";
	const rows = await conn.query(query, [device_serial_number]);
	// console.log(rows);
	if (rows.length > 0) {
		return true;
	}
	return false;
}
// A function to create a new device
async function createDevice(deviceData) {
	let createdDevice = "";

	try {
		const query1 =
			"SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = $1";
		const rows1 = await conn.query(query1, [deviceData.customer_id]);
		if (rows1.length === 0) {
			createdDevice = {
				status: "fail",
				message: `there is no customer with id of ${deviceData.customer_id}`,
			};
			return createdDevice;
		}
		const customerId = rows1[0].customer_id;
		const query2 =
			"INSERT INTO customer_device_identifier (customer_id,device_model,device_color) VALUES ($1,$2,$3) RETURNING device_id";
		const rows2 = await conn.query(query2, [
			customerId,
			deviceData.device_model,
			deviceData.device_color,
		]);

		if (!rows2) {
			createdDevice = {
				status: "fail",
				message: "Failed to add the device!",
			};
			return createdDevice;
		}
		const deviceId = rows2[0].device_id;
		const query3 =
			"INSERT INTO customer_device_info (customer_id, device_id,device_serial_number,device_make,device_type) VALUES ($1,$2,$3,$4,$5)";
		const rows3 = await conn.query(query3, [
			customerId,
			deviceId,
			deviceData.device_serial_number,
			deviceData.device_make,
			deviceData.device_type,
		]);

		if (!rows3) {
			createdDevice = {
				status: "fail",
				message: "Failed to add the device info!",
			};
			return createdDevice;
		}
		createdDevice = {
			message: "device info added successfully",
			owner: rows1[0].customer_first_name,
		};
		return createdDevice;
	} catch (error) {
		console.log(error.message);
	}
}
// A function to update device information
async function updateDevice(deviceId, updates) {
	try {
		const query =
			"WITH update_cdi AS (UPDATE customer_device_identifier SET device_model = $1,device_color = $2 WHERE device_id = $3 RETURNING *), update_cd_info AS (UPDATE customer_device_info SET device_serial_number = $4,device_make= $5, device_type = $6 WHERE device_id = $7 RETURNING *) SELECT cdi.*, cd_info.* FROM update_cdi cdi INNER JOIN update_cd_info cd_info ON cdi.customer_id = cd_info.customer_id AND cdi.device_id = cd_info.device_id";

		const rows = await conn.query(query, [
			updates.device_model,
			updates.device_color,
			deviceId,
			updates.device_serial_number,
			updates.device_make,
			updates.device_type,
			deviceId,
		]);

		if (rows.length === 0) {
			const returnData = {
				status: "fail",
				message: "device does not exist",
			};
			return returnData;
		}
		const returnData = {
			status: "success",
			updates: rows[0],
		};

		return returnData;
	} catch (error) {
		console.log(error.message);
	}
}

async function getSingleDeviceById(deviceId) {
	const query =
		"SELECT * FROM customer_device_identifier cdi INNER JOIN customer_device_info cd_info ON cdi.customer_id = cd_info.customer_id AND cdi.device_id = cd_info.device_id WHERE cd_info.device_id = $1";
	const rows = await conn.query(query, [deviceId]);
	if (rows.length === 0) {
		return false;
	}
	return rows[0];
}
async function getDevicesPerCustomer(customer_id) {
	const query =
		"SELECT * FROM customer_device_identifier cdi INNER JOIN customer_device_info cd_info ON cdi.customer_id = cd_info.customer_id AND cdi.device_id = cd_info.device_id WHERE cdi.customer_id = $1";
	const rows = await conn.query(query, [customer_id]);
	if (rows.length === 0) {
		const returnData = {
			status: "fail",
			message: "device does not exist",
		};
		return returnData;
	}
	return rows; // Assuming there is only one customer with a given ID
}

// Export all functions for use in the controller
module.exports = {
	checkIfDeviceExists,
	createDevice,
	updateDevice,
	getSingleDeviceById,
	getDevicesPerCustomer,
};
