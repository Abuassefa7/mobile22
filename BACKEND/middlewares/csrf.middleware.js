

// verify csrf token function
function verifyCsrfToken(req, res, next) {
	if (req.method !== "GET" && req.method !== "HEAD") {
		// Verify the CSRF token

		try {
			
			const token = req.headers["x-csrf-token"];
			console.log("token from the client:", token);
			console.log("token from the session:", req.session.csrfToken);
			if (req.session.csrfToken !== token) {
				return res.status(403).json({ error: "Invalid CSRF token" });
			}
		} catch (err) {
			return res.status(403).json({ error: "Invalid CSRF token" });
		}
	}
	next();
}
const csrfMiddleware = {
    verifyCsrfToken
}
module.exports = csrfMiddleware;