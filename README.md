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
var createRouter = require( 'express-router-bunyan-loglevel' );
```

#### createRouter( logger )

Returns an [Express](http://expressjs.com/guide/using-middleware.html) router configured to use a [Bunyan](https://github.com/trentm/node-bunyan) logger.

``` javascript
var bunyan = require( 'bunyan' );

var logger = bunyan.createLogger({
	'name': 'logger',
	'streams': [
		{
			'name': 'main',
			'level': 'info',
			'stream': process.stdout
		}
	]
});

var router = createRouter( logger );
```

#### router

A mountable [Express](http://expressjs.com/guide/routing.html) route handler.

``` javascript
var express = require( 'express' );

// Create a new application:
var app = express();

// Mount the route handler on the application:
app.use( '/logger', router );
```

---
## Routes

<a name="loglevel-put"></a>
#### PUT /loglevel

URI endpoint for setting the server application __global__ log level.


##### Request: (application/json)

The request should include a JSON body having the following fields:

*	__level__: log level. The level may be specified as either a `string` or `number`. The `string` may be one of the following (see [node-bunyan](https://github.com/trentm/node-bunyan#levels); `string` options listed along with their numeric equivalents):
	-	(60) __fatal__
	-	(50) __error__
	-	(40) __warn__
	-	(30) __info__
	-	(20) __debug__
	-	(10) __trace__

``` javascript
{
	"level": <string|number>
}
```


##### Response: 204 (text/plain)

The response body will be

```
OK
```


##### Error: 400 (application/json)

If a request contains invalid body parameters, an error response will contain the error `status` and an associated `message`.

``` javascript
{
	"status": 400,
	"message": "...'"
}
```


##### Examples

From the command-line,

``` bash
$ curl -X PUT -d '{"level":"info"}' 'http://127.0.0.1:<port>/loglevel' --header "Content-type:application/json"
```

From another [Node](https://nodejs.org/) application,

``` javascript
var request = require( 'request' );

var body = {
	'level': 'info'
};

request({
	'uri': 'http://127.0.0.1:<port>/loglevel',
	'method': 'PUT',
	'json': body
}, onResponse );

function onResponse( error, response, body ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( body );
}
```

A successful request will receive the following response body:

```
OK
```

===
<a name="loglevel-name-put"></a>
#### PUT /loglevel/:name

URI endpoint for setting the log level for a log stream specified by the `name` parameter.


##### Request: (application/json)

The request should include a JSON body having the following fields:

*	__level__: log level. The level may be specified as either a `string` or `number`. The `string` may be one of the following (see [node-bunyan](https://github.com/trentm/node-bunyan#levels); `string` options listed along with their numeric equivalents):
	-	(60) __fatal__
	-	(50) __error__
	-	(40) __warn__
	-	(30) __info__
	-	(20) __debug__
	-	(10) __trace__

``` javascript
{
	"level": <string|number>
}
```


##### Response: 204 (text/plain)

The response body will be

```
OK
```


##### Error: 400 (application/json)

If a request contains invalid body parameters, an error response will contain the error `status` and an associated `message`.

``` javascript
{
	"status": 400,
	"message": "...'"
}
```


##### Examples

From the command-line,

``` bash
$ curl -X PUT -d '{"level":"info"}' 'http://127.0.0.1:<port>/loglevel/beep' --header "Content-type:application/json"
```

From another [Node](https://nodejs.org/) application,

``` javascript
var request = require( 'request' );

var body = {
	'level': 'info'
};

request({
	'uri': 'http://127.0.0.1:<port>/loglevel/beep',
	'method': 'PUT',
	'json': body
}, onResponse );

function onResponse( error, response, body ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( body );
}
```

A successful request will receive the following response body:

```
OK
```



---
## Examples

``` javascript
var bunyan = require( 'bunyan' ),
	request = require( 'request' ),
	express = require( 'express' ),
	createRouter = require( 'express-router-bunyan-loglevel' );


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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

---
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
