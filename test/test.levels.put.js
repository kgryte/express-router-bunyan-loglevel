/* global require, describe, it */
'use strict';

var mpath = './../lib/levels/PUT';


// MODULES //

var chai = require( 'chai' ),
	noop = require( '@kgryte/noop' ),
	logger = require( './fixtures/logger.js' ),
	mw = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( '[PUT] levels', function tests() {

	it( 'should export a function', function test() {
		expect( mw ).to.be.a( 'function' );
	});

	it( 'should return an array of middleware', function test() {
		expect( mw( logger( noop ) ) ).to.be.an( 'array' );
	});

});
