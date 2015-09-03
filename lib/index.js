'use strict';

// MODULES //

var express = require( 'express' ),
	setLevel = require( './level/PUT' ),
	setLevels = require( './levels/PUT' );


// ROUTER //

/**
* FUNCTION: create( logger )
*	Returns router level middleware for setting the log level of a Bunyan logger.
*
* @param {Logger} logger - logger instance
* @returns {Function} router
*/
function create( logger ) {
	var router = express.Router(),
		mw;

	mw = setLevels( logger );
	router.put( '/loglevel', mw );

	mw = setLevel( logger );
	router.put( '/loglevel/:name', mw );

	return router;
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
