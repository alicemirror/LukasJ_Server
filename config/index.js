/**
	\file index.js
	\brief Server configuration structure

	Define the json-format parameters for the server, version and the http and database
	access paramters, uRI, port etc.
	The JWT_SECRET is used by the restify-jwt to generate the tokens. It maybe enforced
	introducing a more complex key generator, not in human-readable format.

	\page Previous version config.js
	Before the introduction of the "rigid" config.js directly in the server main
	folder the parameters was defined as below:

	\code
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
	\endcode

	\version 1.0.12
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/

/**
	Prefix route paths.

	The use of a prefix route path a workaround 
	restify does not support this feature, but we need for better
	flexibility.
*/
'use strict'
const API_ROOT  = '/api'

module.exports = {
    LOG_LEVEL   : 'info',
    PORT        : 3000,
	db: {
		uri: 'mongodb://127.0.0.1:27017/lukas',
	},

	//! Server name
	name: 'LukasJ-JWT',
	//! Internal version number
	version: '0.0.2',

    //! key to generate JWT
    JWT_SECRET  : 'some-secret',

    /** 
		This method will be used to build the route paths
		in the format /api/[route name]
	*/
    basePath : (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
    }

}
