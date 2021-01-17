var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');

var indexRouter = require('./routes/index');
var devicesRouter = require('./routes/devices');
var deviceStatus = require('./utils/deviceStatus');

var app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));

app.use('/', indexRouter);
app.use('/devices', devicesRouter);

app.use(function (req, res, next) {
	next(createError(404));
});
cron.schedule('*/.5 * * * *', () => {
	console.log('Checking Status on devices');
	deviceStatus.check();
	console.log('Devices Checked');
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	// jank handle errors here, come up with better solution
	res.send({
		error: err.status,
		msg: 'Lutfen degisik bir url kullan',
		requested_route: req.url,
	});
});

module.exports = app;
