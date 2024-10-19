// Import the ria service
const riaService = require("../services/ria.service.js");
// Create the add ria rate controller
async function createRate(req, res, next) {
	// Check if the rate already exists in the database
	const rateExists = await riaService.checkIfRateExists(
		req.body.rate_service_name
	);
	if (rateExists) {
		res.status(400).json({
			error: "This rate is already added!",
		});
	} else {
		try {
			const rateData = req.body;

			// Create the new ria rate
			const rate = await riaService.createRate(rateData);
			if (rate.status === "fail") {
				res.status(400).json({
					status: rate.status,
					message: rate.message,
				});
			} else {
				res.status(200).json({
					status: "true",
					riaRate: rate.rateValue,
				});
			}
		} catch (error) {
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}
// Create the update rate controller
async function updateRate(req, res, next) {
	try {
		const rateId = req.params.id;
		const updates = req.body;
		const updatedRate = await riaService.updateRate(rateId, updates);

		if (updatedRate.status === "fail") {
			res.status(404).json({
				status: updatedRate.status,
				message: updatedRate.message,
			});
		}

		res.status(200).json({
			status: "success",
			updatedInfo: updatedRate.updates,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Create the get all  rate controller
const getAllRates = async (req, res) => {
	try {
		const rates = await riaService.getAllRates();
		res.status(200).json({
			rates,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};
// Create the delete rate controller
async function deleteRateById(req, res, next) {
	try {
		const rateId = req.params.id;
		const deletedRate = await riaService.deleteRateById(rateId);

		if (deletedRate) {
			res.status(200).json({
				data: "Rate Deleted Successfully",
			});
		} else {
			res.status(400).json({
				error: "Failed to delete the rate!",
			});
		}
	} catch (error) {
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

// Export the riaRate controller
module.exports = {
	createRate,
	updateRate,
	getAllRates,
	deleteRateById,
};
