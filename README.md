Router
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Express](http://expressjs.com/guide/using-middleware.html) router to set the log level(s) of a [Bunyan](https://github.com/trentm/node-bunyan) logger.


## Installation

``` bash
$ npm install express-router-bunyan-loglevel
```


## Usage

``` javascript
var router = require( 'express-router-bunyan-loglevel' );
```

#### router( logger )

Returns an [Express](http://expressjs.com/guide/using-middleware.html) router.

``` javascript

```


## Examples

``` javascript
var bunyan = require( 'bunyan' ),
	request = require( 'request' ),
	express = require( 'express' ),
	router = require( 'express-router-bunyan-loglevel' );


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
app.use( '/', router( logger ) );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/express-router-bunyan-loglevel.svg
[npm-url]: https://npmjs.org/package/express-router-bunyan-loglevel

[travis-image]: http://img.shields.io/travis/kgryte/express-router-bunyan-loglevel/master.svg
[travis-url]: https://travis-ci.org/kgryte/express-router-bunyan-loglevel

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/express-router-bunyan-loglevel/master.svg
[codecov-url]: https://codecov.io/github/kgryte/express-router-bunyan-loglevel?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/express-router-bunyan-loglevel.svg
[dependencies-url]: https://david-dm.org/kgryte/express-router-bunyan-loglevel

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/express-router-bunyan-loglevel.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/express-router-bunyan-loglevel

[github-issues-image]: http://img.shields.io/github/issues/kgryte/express-router-bunyan-loglevel.svg
[github-issues-url]: https://github.com/kgryte/express-router-bunyan-loglevel/issues
