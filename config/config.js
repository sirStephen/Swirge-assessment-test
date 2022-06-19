import { config } from "dotenv";
config();

const baseConfig = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: "mysql"
};

const testbaseConfig = {
	username: process.env.TEST_DB_USERNAME,
	password: process.env.TEST_DB_PASSWORD,
	database: process.env.TEST_DB_DATABASE,
	host: process.env.TEST_DB_HOST,
	port: process.env.TEST_DB_PORT,
	dialect: "mysql"
};

const dbConfig = {
	development: baseConfig,
	test: testbaseConfig,
	production: Object.assign(
		{
			logging: false,
			pool: {
				max: 60,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
		},
		baseConfig
	),
};

export default dbConfig;
