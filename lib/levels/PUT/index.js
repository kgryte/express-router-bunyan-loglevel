'use strict';

// MODULES //

var parse = require( 'body-parser' ).json(),
	validate = require( 'validate' ),
	okay = require( 'okay' ),
	levels = require( './levels.js' );


// MIDDLEWARE //

/**
* FUNCTION: middleware( logger )
*	Returns middleware for setting all log stream levels.
*
* @param {Logger} logger - logger instance
* @returns {Function[]} middleware stack
*/
function middleware( logger ) {
	return [
		parse,
		validate,
		levels( logger ),
		okay
	];
} // end FUNCTION middleware()


// EXPORTS //

module.exports = middleware;
