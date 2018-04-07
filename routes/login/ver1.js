/** 
	\file ver1.js
	\brief Route 'register' definition

	\version 1.0.2
	\date April 2018
	\author Enrico Miglino <enrico.miglino@gmail.com>
*/
'use strict'

const MODULE_ID = 'api:login'
const logger    = require('../../utils/logger')
const config    = require('../../config')
const errors    = require('restify-errors')

module.exports = (req, res, next) => {
    logger.info('%s: request received', MODULE_ID)

    let resp = {}

	logger.info('Body request { user:%s, password:%s}', req.body.user, req.body.password);

    if (!req.body.user) {
        resp = new errors.BadRequestError('Field [user] missing')
    } else if (!req.body.password) {
        resp = new errors.BadRequestError('Field [password] missing')
    } else {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(req.body, config.JWT_SECRET)

        // set all the input data as response and add the token
        resp = req.body
		
        resp['token']   = token

        logger.info('%s: token generated', MODULE_ID);
    }

    res.send(resp)

    logger.info('%s: response sent', MODULE_ID)
    return next()
}
