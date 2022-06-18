"use strict";

import { Sequelize, DataTypes } from "sequelize";
import catfacts from './catfactsModel.js';

const env = process.env.NODE_ENV || "development";
import configFile from "../config/config.js";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// create table on swirge db
// const queryInterface = sequelize.getQueryInterface();

// queryInterface.createTable('catfacts', {
//   	_id: DataTypes.STRING,
// 	text: DataTypes.TEXT,
// 	updatedAt: DataTypes.DATE,
// 	type: DataTypes.STRING,
// 	createdAt: DataTypes.DATE,
// 	deleted: {
// 		type: DataTypes.BOOLEAN,
// 		defaultValue: false,
// 		allowNull: false
// 	}
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.catfacts = catfacts(sequelize, DataTypes);

export default db;
