'use strict';

/**
* FUNCTION: level( logger )
*	Returns middleware for setting a runtime log level.
*
* @param {Logger} logger - logger instance
* @returns {Function} middleware
*/
function level( logger ) {
	/**
	* FUNCTION: level( request, response, next )
	*	Sets a runtime log level.
	*
	* @param {Object} request - HTTP request object
	* @param {Object} response - HTTP response object
	* @param {Function} next - callback to invoke after setting a runtime log level
	*/
	return function level( request, response, next ) {
		var name = request.params.name,
			lev = request.body.level;

		logger.info( 'Setting `%s` log level to %s.', name, lev );
		logger.levels( name, lev );

		next();
	}; // end FUNCTION level()
} // end FUNCTION level()


// EXPORTS //

module.exports = level;
