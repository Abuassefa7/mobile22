// Import the rent service
const rentService = require("../services/rent.service.js");
// Create the add rent rate controller
async function createRent(req, res, next) {
	// Check if the rent already exists in the database
	const rentExists = await rentService.checkIfRentExists(
		req.body.owner_phonenumber
	);
	if (rentExists) {
		res.status(400).json({
			error: "This rent is already added!",
		});
	} else {
		try {
			const rentData = req.body;

			// Create the new rental basement
			const rent = await rentService.createRent(rentData);
			if (rent.status === "fail") {
				res.status(400).json({
					status: rent.status,
					message: rent.message,
				});
			} else {
				res.status(200).json({
					status: rent.status,
					basement: rent.newRent,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}
// Create the update rate controller
async function updateRent(req, res, next) {
	try {
		const rentId = req.params.id;
		const updates = req.body;
		const updatedRent = await rentService.updateRent(rentId, updates);

		if (!updatedRent) {
			res.status(404).json({
				status: "fail",
				message: "failed to update",
			});
		}

		res.status(200).json({
			status: "success",
			updatedInfo: updatedRent.updatedData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Create the delete rent controller
async function deleteRentById(req, res, next) {
	try {
		const rentId = req.params.id;
		const deletedRent = await rentService.deleteRentById(rentId);

		if (deletedRent) {
			res.status(200).json({
				data: "Besment Deleted Successfully",
			});
		} else {
			res.status(400).json({
				error: "Failed to delete the basement!",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
// Create the get all  rate controller
const getAllRents = async (req, res) => {
	try {
		const rents = await rentService.getAllRents();
		res.status(200).json({
			rents,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};
// Create the get all  rate controller
const getSingleRents = async (req, res) => {
	const { id } = req.params;
	try {
		const rent = await rentService.getSingleRents(id);
		res.status(200).json({
			rent,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};

// Export the riaRate controller
module.exports = {
	createRent,
	updateRent,
	getAllRents,
	getSingleRents,
	deleteRentById,
};
