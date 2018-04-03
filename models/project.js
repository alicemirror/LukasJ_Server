/** 
	\file project.js
	\brief Database schema for the projects collection

	Projects data can be accessed only by authorized users

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
	\brief Project collection schema structure

	Defines the DB fields required for this collection
	and relative attributes

	\note The "status" field is associated to a list of possible
	statuses that are the only accepted by the server
*/
const ProjectSchema = new mongoose.Schema(
	{
		//! Project short name
		project: {
			type: String,
			required: true,
			trim: true,
		},
		//! Project long description
		description: {
			type: String,
			required: true,
			trim: true,
		},
		//! Project Author
		author: {
			type: String,
			required: true,
			trim: true,
		},
		//! Project status (one of the possible listed in the enum
		status: {
			type: String,
			required: true,
			enum: ['pending', 'complete', 'in progress', 'delayed', 'closed'],
			default: 'pending',
		},
	},
	{ minimize: false }
);

//! Implement the timestamps plugin to the collection
ProjectSchema.plugin(timestamps);
//! Implement the database string query plugin to the collection
ProjectSchema.plugin(mongooseStringQuery);

//! Defines the Project Schema object
const Project = mongoose.model('Project', ProjectSchema);
//! Export the Project Schema object to the calling modules
module.exports = Project;    

