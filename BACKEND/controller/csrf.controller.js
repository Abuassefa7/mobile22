// import crypto
const crypto = require('crypto');
const getCsrfToken = async (req, res) => {
	// Generate a new CSRF token and store it in the session
	// const csrfToken = req.csrfToken();
	const csrfToken = crypto.randomBytes(16).toString("hex");;
	console.log("token initial::",csrfToken);
	req.session.csrfToken = csrfToken;

	console.log("session on get:", req.session);

	// Save the session
	req.session.save((err) => {
		if (err) {
			return next(err);
		}

		// Send the CSRF token back to the client
		res.json({ csrfToken });
	});
};
// export
module.exports = {getCsrfToken};