'use strict';

/**
* FUNCTION: Logger( clbk )
*	Creates a new mock Logger.
*
* @constructor
* @param {Function} clbk - callback to invoke when a method is called
* @returns {Logger} mock Logger
*/
function Logger( clbk ) {
	if ( !(this instanceof Logger ) ) {
		return new Logger( clbk );
	}
	this._clbk = clbk;
	return this;
} // end FUNCTION Logger()

/**
* METHOD: info
*	Mocks the info method.
*
* @returns {Logger} Logger instance
*/
Logger.prototype.info = function info() {
	return this;
}; // end METHOD info()

/**
* METHOD: level( value )
*	Mocks the level method.
*
* @param {Number} value - level value
* @returns {Logger} Logger instance
*/
Logger.prototype.level = function level( value ) {
	this._clbk( value );
	return this;
}; // end METHOD level()

/**
* METHOD: levels( name, value )
*	Mocks the levels method.
*
* @param {String} name - stream name
* @param {Number} value - level value
* @returns {Logger} Logger instance
*/
Logger.prototype.levels = function levels( name, value ) {
	this._clbk( name, value );
	return this;
}; // end METHOD levels()


// EXPORTS //

module.exports = Logger;
