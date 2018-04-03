/**
	\file config.js
	\brief Server configuration structure

	Define the json-format parameters for the server, version and the http and database
	access paramters, uRI, port etc.

	\note The keys "env" and "port" are ORed between the environment NODE_ENV and PORT and
	their default values

	\version 1.0.0
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'
module.exports = {
	name: 'LukasJ',
	version: '0.0.1',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
	db: {
		uri: 'mongodb://127.0.0.1:27017/lukas',
	},
}
