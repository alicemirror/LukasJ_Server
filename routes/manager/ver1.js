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

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID);

    res.send(resp);

    logger.info('%s: response sent', MODULE_ID);
    return next();
}
