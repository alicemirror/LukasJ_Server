/**
	\file config.js
	\brief Server configuration structure

	Define the json-format parameters for the server, version and the http and database
	access paramters, uRI, port etc.
	The keys "env" and "port" are ORed between the environment NODE_ENV and PORT and
	their default values.\n
	The JWT_SECRET is used by the restify-jwt to generate the tokens. It maybe enforced
	introducing a more complex key generator, not in human-readable format.

	\version 1.0.0
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'
module.exports = {
	name: 'LukasJ-JWT',
	version: '0.0.2',
    JWT_SECRET  : 'jwt-secret-token-generator',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
	db: {
		uri: 'mongodb://127.0.0.1:27017/lukas',
	},
}
