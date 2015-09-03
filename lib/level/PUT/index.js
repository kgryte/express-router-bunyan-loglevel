'use strict';

// MODULES //

var parse = require( 'body-parser' ).json(),
	validate = require( 'validate' ),
	okay = require( 'okay' ),
	level = require( './level.js' );


// MIDDLEWARE //

/**
* FUNCTION: middleware( logger )
*	Returns middleware for setting the level of a log stream.
*
* @param {Logger} logger - logger instance
* @returns {Function[]} middleware stack
*/
function middleware( logger ) {
	return [
		parse,
		validate,
		level( logger ),
		okay
	];
} // end FUNCTION middleware()


// EXPORTS //

module.exports = middleware;
