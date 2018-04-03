/** 
	\file managers.js
	\brief Database schema for the agers collection

	Project managers data can be accessed contains the sensible information
	for user login and password.

	\note Despite the security level based on the json token when logging
	in a production server the https protocol should be used to avoit
	unsecured client-server transition.

	\version 1.0.0
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'
//! Database interface
const mongoose = require('mongoose');
//! Database query interface (strng-based) 
const mongooseStringQuery = require('mongoose-string-query');
//! Database timestamp manager. A timestamp is added to every object
//! creation or modification
const timestamps = require('mongoose-timestamp');

/**
	\brief Manager collection schema structure

	Defines the DB fields required for this collection
	and relative attributes

	\note The "status" field is associated to a list of possible
	statuses that are the only accepted by the server
*/
const ManagerSchema = new mongoose.Schema(
	{
		//! Manager name
		manager: {
			type: String,
			required: true,
			trim: true,
		},
		//! Manager email
		email: {
			type: String,
			required: true,
			trim: true,
		},
		//! Manager user
		user: {
			type: String,
			required: true,
			trim: true,
		},
		//! Manager password
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ minimize: false }
);

//! Implement the timestamps plugin to the collection
ManagerSchema.plugin(timestamps);
//! Implement the database string query plugin to the collection
ManagerSchema.plugin(mongooseStringQuery);

//! Defines the Manager Schema object
const Manager = mongoose.model('Manager', ManagerSchema);
//! Export the Manager Schema object to the calling modules
module.exports = Manager;    

