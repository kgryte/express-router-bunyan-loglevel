/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../lib/node_modules/validate';


// MODULES //

var chai = require( 'chai' ),
	validate = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	// SETUP //

	var request, response, next;

	request = {
		'body': {
			'level': 'info'
		}
	};
	response = {};
	next = function next(){};

	beforeEach( function() {
		request.body = {
			'level': 'info'
		};
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an invalid level parameter', function test( done ) {
		var values, count;

		values = [
			null,
			undefined,
			NaN,
			true,
			{},
			function(){},
			[]
		];

		next = function next( error ) {
			if ( error ) {
				assert.ok( true );
			} else {
				assert.notOk( true );
			}
			if ( ++count === values.length ) {
				done();
			}
		};

		count = 0;
		for ( var i = 0; i < values.length; i++ ) {
			request.body.level = values[ i ];
			validate( request, response, next );
		}
	});

	it( 'should return an error if provided an unrecognized level string', function test( done ) {
		next = function next( error ) {
			if ( error ) {
				assert.ok( true );
			} else {
				assert.notOk( true );
			}
			done();
		};
		request.body.level = 'unknown_level';
		validate( request, response, next );
	});

	it( 'should invoke a callback after successfully validating', function test( done ) {
		next = function next( error ) {
			if ( error ) {
				assert.notOk( true );
			} else {
				assert.ok( true );
			}
			done();
		};
		validate( request, response, next );
	});

});
