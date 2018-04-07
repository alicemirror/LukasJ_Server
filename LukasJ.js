/** 
	\file index.js
	\brief Main js page processing the REST API Request

	Initialize and start the server and database.

	\mainpage "Development Architecture"
	\image html ./DevelopmentArchitecture.jpg"

	\page version_info Version History

	1.0.1 Server implementation with database access (two collections)\n

	1.0.2 Implementation of the JWT token\n
	Added the routes in separate folders and introduced the routes versioning\n
	Modified the restful endpoints with the prefix /api \n
	Known bugs: token is not generated correctly\n
	Rest path prefix should be reviewed

	\version 1.0.2
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

//! Main module rest ID
var MODULE_ID = 'app:main'

var config = require('./config');					///< Configuration file
var logger = require('./utils/logger'); 			///< The server logger

var jwt       = require('restify-jwt-community'); ///< Java Web Token module

logger.info('%s: initializing', MODULE_ID);

var restify = require('restify');						///< Module restify
var mongoose = require('mongoose');						///< mongoose restify interface
//const restifyPlugins = require('restify-plugins');	///< nodes for restify plugins
var restifyPlugins = require('restify').plugins;		///< nodes for restify plugins

/**
	\brief Initialize Server

	Create the restify server based on the configuration file config.js
	The server constant is manged by the server listener during the initialization
*/
var server = restify.createServer({
	name: config.name,
	version: config.version
});

//! Restify plugin for parsing body calls
server.use(restifyPlugins.bodyParser());

// Authorization
var jwtConfig = { secret: config.JWT_SECRET };
// secure all routes, except /manager_noauth
server.use(jwt(jwtConfig).unless({
	path: [ config.basePath('/register') ],
	path: [ config.basePath('/login') ]
}));
// Restify jsonBodyParser plugin for json format parameters mapping
// server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
// Restify acceptParser plugin
// server.use(restifyPlugins.acceptParser(server.acceptable));
// Restify queryParser plugin
server.use(restifyPlugins.queryParser({ mapParams: true }));

server.use(restifyPlugins.bodyParser());

/**
	\brief Start Server, Connect to DB & Require Routes

	The database is opened passing the routes.js defining all the DB methods.
	
	\note The db connection is checked for error but not the server startup
	itself, required not to run multiple instances.

	\todo Process a more reliable error messaging than the bare returned error condition
	from the DB..	
*/

// Routes
require('./routes')(server)


// server.listen(config.PORT)
server.listen(config.PORT, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri);

	logger.info('connect(config.db.url)');

	// Define the current db connection
	var db = mongoose.connection;

	logger.info('created db = mongoose.connection');

	db.on('error', (err) => {
		logger.info('Error establishing connection to DB');
	    console.error(err);
	    process.exit(1);
	});

	logger.info('NO Errors creating the connection to DB');

	// Open the database connection and start the server
	db.once('open', () => {
		logger.info('%s: ready.', MODULE_ID);
		console.log(`Server ${config.name}\nInternal ver.${config.version}\nListening on port ${config.PORT}`);
	});
});

module.exports = server
  
