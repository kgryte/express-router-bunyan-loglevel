/* global require, describe, it */
'use strict';

var mpath = './../lib/levels/PUT/levels.js';


// MODULES //

var chai = require( 'chai' ),
	noop = require( '@kgryte/noop' ),
	logger = require( './fixtures/logger.js' ),
	levels = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '[PUT] levels', function tests() {

	// SETUP //

	var request, response;

	request = {
		'body': [
			{
				'level': 'info'
			}
		]
	};
	response = {};

	// TESTS //

	it( 'should export a function', function test() {
		expect( levels ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( levels( logger( noop ) ) ).to.be.a( 'function' );
	});

	it( 'should set the log level', function test( done ) {
		var fcn = levels( logger( onSet ) );
		fcn( request, response, noop );
		function onSet( value ) {
			assert.strictEqual( value, request.body.level );
			done();
		}
	});

	it( 'should invoke a callback after setting the log level', function test( done ) {
		var fcn = levels( logger( noop ) );
		fcn( request, response, next );
		function next() {
			assert.ok( true );
			done();
		}
	});

});
