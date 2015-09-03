/* global require, describe, it */
'use strict';

var mpath = './../lib/level/PUT/level.js';


// MODULES //

var chai = require( 'chai' ),
	noop = require( '@kgryte/noop' ),
	logger = require( './fixtures/logger.js' ),
	level = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '[PUT] level', function tests() {

	// SETUP //

	var request, response;

	request = {
		'params': {
			'name': 'beep'
		},
		'body': [
			{
				'level': 'info'
			}
		]
	};
	response = {};

	// TESTS //

	it( 'should export a function', function test() {
		expect( level ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( level( logger( noop ) ) ).to.be.a( 'function' );
	});

	it( 'should set the log level', function test( done ) {
		var fcn = level( logger( onSet ) );
		fcn( request, response, noop );
		function onSet( name, value ) {
			assert.strictEqual( name, request.params.name );
			assert.strictEqual( value, request.body.level );
			done();
		}
	});

	it( 'should invoke a callback after setting the log level', function test( done ) {
		var fcn = level( logger( noop ) );
		fcn( request, response, next );
		function next() {
			assert.ok( true );
			done();
		}
	});

});
