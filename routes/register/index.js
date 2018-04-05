/** 
	\file index.js
	\brief Route 'register' main page (unprotected)

	The route features and specifications are defined in the respective versioned file

	\version 1.0.2
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

const config    = require('../../config')

module.exports = (server) => {
    server.post({ path: config.basePath('/register'),
        version: '1.0.0' }, require('./ver1'))
}
