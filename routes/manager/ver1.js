/** 
	\file ver1.js
	\brief Route 'manager' definition

	\version 1.0.2
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

const MODULE_ID = 'api:manager';
const logger    = require('../../utils/logger');
const config    = require('../../config');
const errors    = require('restify-errors');
const Manager = require('../../models/manager');

module.exports = (req, res, next) => {
		Manager.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(new errors.InvalidContentError(err.errors.name.message));
			}
			res.send(docs);
			next();
		});
    return next();
}
