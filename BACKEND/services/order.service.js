// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// import uuid and crypto module to have an order hashed id
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
// A function to check if customer exists in the database
async function checkIfCustomerExists(customer_id) {
	const query = "SELECT * FROM customer_identifier WHERE customer_id = $1 ";
	const rows = await conn.query(query, [customer_id]);
	// console.log(rows);
	if (rows.length > 0) {
		return true;
	}
	return false;
}

async function generateUniqueRandomNumber() {
	try {
		// Fetch all existing order numbers from the database
		const query = "SELECT order_number FROM order_status";
		const result = await conn.query(query);

		const numbers = result?.map((row) => row.order_number);
		// console.log(numbers);
		let uniqueNumber;

		// Generate a unique 5-digit number
		while (true) {
			uniqueNumber = Math.floor(Math.random() * 90000) + 10000; // Random number between 10000-99999
			if (!numbers.includes(uniqueNumber)) {
				break;
			}
		}

		return uniqueNumber;
	} catch (error) {
		console.error("Error fetching order numbers:", error);
		return null;
	}
}

// A function to add a new order
async function createOrder(order) {
	let createdOrder = "";
	// console.log("coming order:", order);
	try {
		// generating a random order hashed id
		function generateRandomOrderHashedId() {
			const randomBytes = crypto.randomBytes(16);
			const uuid = uuidv4({ random: randomBytes });
			return uuid;
		}
		const orderHashedId = generateRandomOrderHashedId();
		const orderNumber = await generateUniqueRandomNumber();
		// order body validation
		if (!order.employee_id || !order.customer_id || !order.device_id) {
			throw new Error("Missing data in request body!");
		}
		// query for Inserting the employee_id,customer_id, vehicle_id, active_order and order_hash in to the orders table
		const query =
			"INSERT INTO orders (employee_id,customer_id, device_id, order_hash)  VALUES ($1,$2,$3,$4) RETURNING order_id";
		const rows = await conn.query(query, [
			order.employee_id,
			order.customer_id,
			order.device_id,
			orderHashedId,
		]);
		// console.log(rows);
		if (!rows || rows[0].length === 0) {
			createdOrder = {
				status: "fail",
				message: "Failed to add the order in orders table!",
			};
			return createdOrder;
		}

		// Get the order id from the insert
		const orderId = rows[0].order_id;

		// Insert the remaining data in to the order_info, order_services, order_status  tables
		const query2 =
			"INSERT INTO order_info (order_id, order_total_price, order_description) VALUES ($1, $2, $3) RETURNING order_info_id";

		// Continue with your database query execution
		const rows2 = await conn.query(query2, [
			orderId,
			order.order_total_price,
			order.order_description,
		]);
		// console.log("rows2 result:", rows2);
		if (!rows2 || rows2[0].length === 0) {
			createdOrder = {
				status: "fail",
				message: "Failed to add the order in order_info table!",
			};
			return createdOrder;
		}

		const query3 =
			"INSERT INTO order_services (order_id, service_id, service_completed)  VALUES ($1, $2, $3) RETURNING order_service_id";

		for (let i = 0; i < order.order_services.length; i++) {
			const service = order.order_services[i];
			const rows3 = await conn.query(query3, [
				orderId,
				service.service_id,
				false,
			]);
			// console.log("rows3 result:", rows3);
			if (!rows3 || rows3[0].length === 0) {
				createdOrder = {
					status: "fail",
					message: "Failed to add the order in order_services table!",
				};
				return createdOrder;
			}
		}

		const query4 =
			"INSERT INTO order_dates (order_id, estimated_completion_date, completion_date)  VALUES ($1, $2, $3) RETURNING order_date_id";
		const rows4 = await conn.query(query4, [
			orderId,
			order.estimated_completion_date,
			order.completion_date,
		]);
		// console.log("rows4 result:", rows4);
		if (!rows4 || rows4[0].length === 0) {
			createdOrder = {
				status: "fail",
				message: "Failed to add the order in order_dates table!",
			};
			return createdOrder;
		}
		const query5 =
			"INSERT INTO order_status (order_id, order_status,order_number, active_order)  VALUES ($1, $2, $3, $4) RETURNING order_status_id";
		const rows5 = await conn.query(query5, [
			orderId,
			"Received",
			orderNumber,
			true,
		]);
		// console.log("rows4 result:", rows4);
		if (!rows5 || rows5[0].length === 0) {
			createdOrder = {
				status: "fail",
				message: "Failed to add the order in order_status table!",
			};
			return createdOrder;
		}
		createdOrder = {
			order_id: orderId,
			status: "success",
			message: "order added successfully!",
		};
	} catch (error) {
		console.log(error);
	}
	return createdOrder;
}

// async function to getAllOrders
async function getAllOrders() {
	try {
		// get all orders query
		const query =
			"SELECT o.order_id, ei.employee_id, ei.employee_first_name, ei.employee_last_name, ci.customer_id, ci.customer_first_name, ci.customer_last_name,cdi.device_id, cdi.device_serial_number, cdi.device_type, cdi.device_make, o.order_hash, od.order_date_id, od.order_date, od.estimated_completion_date, od.completion_date,  oi.order_info_id, oi.order_total_price, COALESCE(os.order_services, '[]'::json) AS order_services, ost.order_status_id, ost.order_status, ost.order_number, ost.active_order FROM orders o JOIN order_dates od ON o.order_id = od.order_id JOIN order_info oi ON o.order_id = oi.order_id LEFT JOIN (SELECT order_id, JSON_AGG( JSON_BUILD_OBJECT( 'order_service_id', order_service_id, 'service_id', service_id, 'service_completed', service_completed)) AS order_services FROM   order_services GROUP BY order_id) os ON o.order_id = os.order_id LEFT JOIN order_status ost ON o.order_id = ost.order_id JOIN employee_info ei ON o.employee_id = ei.employee_id JOIN customer_info ci ON o.customer_id = ci.customer_id JOIN customer_device_info cdi ON o.device_id = cdi.device_id ORDER BY o.order_id DESC;";

		const rows = await conn.query(query);
		return rows;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// async function to getOrderById
async function getOrderById(order_id) {
	try {
		// get all orders query
		const query =
			"SELECT o.order_id, o.employee_id, o.customer_id,ci.customer_first_name, ci.customer_last_name,cid.customer_email,cid.customer_phone_number, o.device_id,cdi.device_make,cdi.device_type,di.device_model, o.order_hash, od.order_date_id, od.order_date, od.estimated_completion_date, od.completion_date, oi.order_info_id, oi.order_total_price, oi.order_description, COALESCE(os.order_services, '[]'::json) AS order_services, ost.order_status_id, ost.order_status, ost.order_number, ost.active_order FROM orders o JOIN order_dates od ON o.order_id = od.order_id JOIN order_info oi ON o.order_id = oi.order_id LEFT JOIN ( SELECT order_id, JSON_AGG( JSON_BUILD_OBJECT('order_service_id', order_service_id, 'service_id', service_id, 'service_completed', service_completed ) ) AS order_services FROM order_services GROUP BY order_id) os ON o.order_id = os.order_id LEFT JOIN order_status ost ON o.order_id = ost.order_id JOIN customer_info ci ON o.customer_id = ci.customer_id JOIN customer_identifier cid ON o.customer_id = cid.customer_id JOIN customer_device_info cdi ON o.device_id = cdi.device_id JOIN customer_device_identifier di ON o.device_id = di.device_id WHERE o.order_id = $1  ";
		const rows = await conn.query(query, [order_id]);
		return rows[0];
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// async function to getOrdersByCustomerId
async function getOrdersByCustomerId(customer_id) {
	try {
		// get all orders query
		const query =
			"SELECT o.order_id, o.employee_id, o.customer_id, o.device_id, o.order_hash, od.order_date_id, od.order_date, od.estimated_completion_date, od.completion_date, oi.order_info_id, oi.order_total_price, oi.order_description, COALESCE(os.order_services, '[]'::json) AS order_services, ost.order_status_id, ost.order_status, ost.order_number, ost.active_order FROM orders o JOIN order_dates od ON o.order_id = od.order_id JOIN order_info oi ON o.order_id = oi.order_id LEFT JOIN ( SELECT order_id, JSON_AGG( JSON_BUILD_OBJECT('order_service_id', order_service_id, 'service_id', service_id, 'service_completed', service_completed ) ) AS order_services FROM order_services GROUP BY order_id) os ON o.order_id = os.order_id LEFT JOIN order_status ost ON o.order_id = ost.order_id WHERE o.customer_id = $1 ";
		const rows = await conn.query(query, [customer_id]);
		return rows;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

async function updateOrder(order_id, order) {
	try {
		// update orders table -basicall to update if the order is actie or not

		const updateOrderQuery =
			"UPDATE order_status SET order_status = $1, active_order= $2 WHERE order_status.order_id = $3 RETURNING *";
		const updateOrderParams = [
			order.order_status,
			order.active_order,
			order_id,
		];
		const updateOrderResult = await conn.query(
			updateOrderQuery,
			updateOrderParams
		);
		if (updateOrderResult.length === 0) {
			return false;
		}

		// Update order_info table
		const updateOrderInfoQuery =
			"UPDATE order_info SET order_total_price= $1, order_description= $2 WHERE order_info.order_id = $3 RETURNING *";
		const updateOrderInfoParams = [
			order.order_total_price,
			order.order_description,
			order_id,
		];
		const updateOrderInfoResult = await conn.query(
			updateOrderInfoQuery,
			updateOrderInfoParams
		);
		if (updateOrderInfoResult.length === 0) {
			return false;
		}

		// update order_services table
		for (i = 0; i < order.order_services.length; i++) {
			const serviceRecord = order.order_services[i];
			const updateOrderServicesQuery =
				"UPDATE order_services SET service_id = $1,service_completed= $2 WHERE order_services.order_id = $3 AND order_service_id = $4 RETURNING *";

			const updateOrderServicesParams = [
				serviceRecord.service_id,
				serviceRecord.service_completed,
				order_id,
				serviceRecord.order_service_id,
			];

			const updateOrderServicesResult = await conn.query(
				updateOrderServicesQuery,
				updateOrderServicesParams
			);

			if (updateOrderServicesResult.length === 0) {
				return false;
			}
		}

		// update order dates table
		const updateOrderStatusQuery =
			"UPDATE order_dates SET estimated_completion_date = $1,completion_date = $2 WHERE order_dates.order_id = $3 RETURNING *";

		const updateOrderStatusParams = [
			order.estimated_completion_date,
			order.completion_date,
			order_id,
		];
		const updateOrderStatusResult = await conn.query(
			updateOrderStatusQuery,
			updateOrderStatusParams
		);
		if (updateOrderStatusResult.length === 0) {
			return false;
		}
		return {
			updateOrderStatusResult,
			updateOrderInfoResult,
			// order_services: order.order_services,
			updateOrderResult,
		};
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

async function getOrderByHash(order_hash) {
	try {
		// get all orders query
		const query =
			"SELECT o.order_id, o.employee_id, o.customer_id, o.device_id, o.order_hash, od.order_date_id, od.order_date, od.estimated_completion_date, od.completion_date, oi.order_info_id, oi.order_total_price, oi.order_description, COALESCE(os.order_services, '[]'::json) AS order_services, ost.order_status_id, ost.order_status, ost.order_number, ost.active_order FROM orders o JOIN order_dates od ON o.order_id = od.order_id JOIN order_info oi ON o.order_id = oi.order_id LEFT JOIN ( SELECT order_id, JSON_AGG( JSON_BUILD_OBJECT('order_service_id', order_service_id, 'service_id', service_id, 'service_completed', service_completed ) ) AS order_services FROM order_services GROUP BY order_id) os ON o.order_id = os.order_id LEFT JOIN order_status ost ON o.order_id = ost.order_id WHERE o.order_hash = $1 ";
		const rows = await conn.query(query, [order_hash]);
		return rows[0];
	} catch (error) {
		console.log(error.message);
		return false;
	}
}

// a function to delete an order by id
async function deleteOrderById(order_id) {
	try {
		// console.log(order_id);
		// delete order status
		const query5 = "DELETE FROM order_status WHERE order_id = $1 RETURNING *";
		const params5 = [order_id];
		const result5 = await conn.query(query5, params5);
		if (result5.length === 0) {
			return false;
		}
		// delete order dates
		const query3 = "DELETE FROM order_dates WHERE order_id = $1 RETURNING *";
		const params3 = [order_id];
		const result3 = await conn.query(query3, params3);
		if (result3.length === 0) {
			return false;
		}

		// delete order services
		const query4 = "DELETE FROM order_services WHERE order_id = $1 RETURNING *";
		const params4 = [order_id];
		const result4 = await conn.query(query4, params4);
		if (result4.length === 0) {
			return false;
		}

		// delete order info
		const query2 = "DELETE FROM order_info WHERE order_id = $1 RETURNING *";
		const params2 = [order_id];
		const result2 = await conn.query(query2, params2);
		if (result2.length === 0) {
			return false;
		}
		// delete order query
		const query = "DELETE FROM orders WHERE order_id = $1 RETURNING *";
		const params = [order_id];
		const result = await conn.query(query, params);
		if (result.length === 0) {
			return false;
		}
		return true;
	} catch {
		console.log(error.message);
	}
}

// Export the functions for use in the controller
module.exports = {
	createOrder,
	checkIfCustomerExists,
	getAllOrders,
	getOrderById,
	updateOrder,
	getOrdersByCustomerId,
	getOrderByHash,
	deleteOrderById,
};
