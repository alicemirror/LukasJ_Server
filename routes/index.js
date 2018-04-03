/** 
	\file index.js
	\brief Define the routes for the project

	\version 1.0.0
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

//! Module Dependency (manage error messages)
const errors = require('restify-errors');
//! Assign the model for the manager
const Manager = require('../models/manager');
//! Assign the model for the project
const Project = require('../models/project');

/** 
	\brief Define the route exports for the REST actions (POST, GET, etc.)

	Every action includes a message error if the parameters are not in
	JSON format. \n

	The restful calls should be: '/manager' and '/project' \n

	The '/manager_noauth' is a POST used to create manager users without
	the login authorization process. This method is just for testing, while
	in a production environment should be always avaialable an authorized
	administrative user enabled to create the first administrators, via some kind
	of external mechanism. \n

	According to the concept that a project status represent an historical object
	(in a production environment this data structure should be more complex with
	some more data and several related collections), it is not provided the DELETE
	mechanism.

	\note Here the JSON formatted data for every collection element (a record)
	are not validated. It is expected that these are validated somewhere else
	accordingly with the corresopnding model structure definition.
	A possible approach is including in the model structure a set of methods
	for data coherence and integrity validation for a better structured approach
	
	\todo Add authorization checking for the calls
	\todo Check the record duplication based on the expected unique fields
*/
module.exports = function(server) {

	// ======================================== Manager routes

	// POST
	// Send data to the database
	server.post('/manager', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Manager: 'application/json' is expected") 
			);
		}
		let data = req.body || {};
		let manager = new Manager(data);
		manager.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.send(201);
			next();
		});
	});

	// POST
	// Send data to the database without authorization checking
	server.post('/manager_noauth', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Manager (no auth): 'application/json' is expected") 
			);
		}
		let data = req.body || {};
		let manager = new Manager(data);
		manager.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.send(201);
			next();
		});
	});

	// LIST
	// List all available manager available in the collection
	// Executing a query to the database
	server.get('/manager', (req, res, next) => {
		Manager.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	// GET
	// Retrieve the specified manager id data from the collection
	server.get('/manager/:manager_id', (req, res, next) => {
		Manager.findOne({ _id: req.params.manager_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(doc);
			next();
		});
	});

	// UPDATE
	// Update the data of the selected manager, queried by id
	server.put('/manager/:manager_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Mmanager: No 'application/json' data")
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.manager_id });
		}

		Manager.findOne({ _id: req.params.manager_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError('Manager: Resource not found')
				);
			}

			Manager.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

	// DELETE
	// Remove the selected manager (queried by id) from the collection
	server.del('/manager/:manager_id', (req, res, next) => {
		Manager.remove({ _id: req.params.manager_id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(204);
			next();
		});
	});

	// ======================================== Project route

	// POST
	// Send data to the database
	server.post('/project', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Project: 'application/json' is expected") 
			);
		}
		let data = req.body || {};
		let project = new Project(data);
		project.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.send(201);
			next();
		});
	});

	// LIST
	// List all available project available in the collection
	// Executing a query to the database
	server.get('/project', (req, res, next) => {
		Project.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(docs);
			next();
		});
	});

	// GET
	// Retrieve the specified project id data from the collection
	server.get('/project/:project_id', (req, res, next) => {
		Project.findOne({ _id: req.params.manager_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			}

			res.send(doc);
			next();
		});
	});

	// UPDATE
	// Update the data of the selected project, queried by id
	server.put('/project/:project_id', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Project: No 'application/json' data")
			);
		}

		let data = req.body || {};

		if (!data._id) {
			data = Object.assign({}, data, { _id: req.params.project_id });
		}

		Project.findOne({ _id: req.params.project_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message)
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError('Project: Resource not found')
				);
			}

			Project.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message)
					);
				}

				res.send(200, data);
				next();
			});
		});
	});
};    

