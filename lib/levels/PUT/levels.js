'use strict';

/**
* FUNCTION: levels( logger )
*	Returns middleware for setting a runtime log level.
*
* @param {Logger} logger - logger instance
* @returns {Function} middleware
*/
function levels( logger ) {
	/**
	* FUNCTION: levels( request, response, next )
	*	Sets a runtime log level.
	*
	* @private
	* @param {Object} request - HTTP request object
	* @param {Object} response - HTTP response object
	* @param {Function} next - callback to invoke after setting a runtime log level
	*/
	return function levels( request, response, next ) {
		var lev = request.body.level;

		logger.info( 'Setting all log levels to %s.', lev );
		logger.level( lev );

		next();
	}; // end FUNCTION levels()
} // end FUNCTION levels()


// EXPORTS //

module.exports = levels;
