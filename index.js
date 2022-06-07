import express from "express";
import config from "./config.js";

// routes
import routes from "./routes/index.js";

// db
import db from "./models/index.js";

const port = config.service.port || 3000;

// Set up the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Require our routes into the application.
app.use(routes);

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);

// Server listen to port
db.sequelize.sync().then(() => {
  console.log("\x1b[32m%s\x1b[0m", `Database Connected`);

  app.listen(port, () => {
    console.log("\x1b[33m%s\x1b[0m", `Server running on port ${port}`);
  });
});

export default app;