/** 
	\file index.js
	\brief Routes main page

	\note The route /api/manager_noauth is deprecated and will be removed
	in future versions

	\version 1.0.2
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

module.exports = (server) => {
    // unprotected routes
    require('./register')(server)
 	require('./login')(server)
 
    // protected routes
    require('./manager')(server)
    //require('./project')(server)
}
