const pg = require("pg");

// Configure the PostgreSQL connection
const dbConfig = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT, // Default PostgreSQL port
};

// Create a new Pool instance
const db = new pg.Client(dbConfig);
db.connect()
	.then(() => console.log("Connected to PostgreSQL database"))
	.catch((err) =>
		console.error("Error connecting to PostgreSQL database:", err)
	);
// Function to execute SQL queries with parameterized queries
async function query(sql, params) {
	const { rows } = await db.query(sql, params);
	return rows;
}

module.exports = { query };
