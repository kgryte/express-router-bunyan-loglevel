'use strict';

// MODULES //

var bunyan = require( 'bunyan' ),
	request = require( 'request' ),
	express = require( 'express' ),
	createRouter = require( './../lib' );


// LOGGER //

var logger = bunyan.createLogger({
	'name': 'logger',
	'streams': [
		{
			'name': 'beep',
			'level': 'info',
			'stream': process.stdout
		},
		{
			'name': 'boop',
			'level': 'debug',
			'stream': process.stdout
		}
	]
});


// APP //

var app = express();

// Mount the router on the application:
app.use( '/', createRouter( logger ) );

// Create an HTTP server:
app.listen( 7331, onListen );

function onListen() {
	logger.info( 'Server is listening for requests on port: 7331.' );
	run();
}


// RUN //

function run() {
	setTimeout( setOne, 1000 );
	setTimeout( setAll, 2500 );
	setTimeout( exit, 3000 );
}

function setOne() {
	request({
		'method': 'PUT',
		'uri': 'http://127.0.0.1:7331/loglevel/beep',
		'json': {
			'level': 'fatal'
		}
	}, onResponse );
}

function setAll() {
	request({
		'method': 'PUT',
		'uri': 'http://127.0.0.1:7331/loglevel',
		'json': {
			'level': 'warn'
		}
	}, onResponse );
}

function onResponse( error, response ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Status: %s.', response.statusCode );
}

function exit() {
	process.exit( 0 );
}
