'use strict'
/** 
	\file index.js
	\brief Main js page processing the REST API Request

	When the server is accessed by the client this page processes
	the request and manage the server behaviour.
	It is also called when the server starts creating the Mongo DB databas
	connection.

	\mainpage "Development Architecture"
	\image html ./DevelopmentArchitecture.jpg"

	\version 1.0.0
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/

//! Configuration file defining the erver parameters, name, version etc.
const config = require('./config');

const restify = require('restify');					///< Module restify
const mongoose = require('mongoose');				///< mongoose restify interface
const restifyPlugins = require('restify-plugins');	///< nodes for restify plugins

/**
	\brief Initialize Server

	Create the restify server based on the configuration file config.js
	The server constant is manged by the server listener during the initialization
*/
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

//! Implements the restify jsonBodyParser plugin for json format parameters mapping
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
//! Implements the restify acceptParser plugin
server.use(restifyPlugins.acceptParser(server.acceptable));
//! Implements the restify queryParser plugin
server.use(restifyPlugins.queryParser({ mapParams: true }));
//! Implements the restify fullResponse plugin setting the server response
server.use(restifyPlugins.fullResponse());

/**
	\brief Start Server, Connect to DB & Require Routes

	Database is opened passing the routes.js defining all the DB methods.
	
	\note The db connection is checked for error but not the server startup
	itself, required not to run multiple instances.

	\todo Process a more reliable error messaging than the bare returned error condition
	from the DB..	
*/
server.listen(config.port, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri);

	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./routes')(server);
	    console.log(`Server LukasJ is listening on port ${config.port}`);
	});
});

  
