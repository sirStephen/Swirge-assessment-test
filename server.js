import express from "express";
import config from "./config.js";

// routes
import routes from "./routes/index.js";

// db
import db from "./models/index.js";

const port = config.service.port || 3000;

// Set up the express app
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Require our routes into the application.
app.use('/api/v1', routes);

// simple route
app.get("/", (req, res) =>
	res.status(200).json({
		message: "Welcome to the beginning of nothingness.",
	})
);

// Server listen to port 
//{force: false} to retain data in the database
db.sequelize.sync({ force: false }).then(() => {
  	console.log("\x1b[32m%s\x1b[0m", `Database Connected`);

	app.listen(port, () => {
		console.log("\x1b[33m%s\x1b[0m", `Server running on port ${port}`);
	});
});

export default app;