var express = require('express');
var router = express.Router();
var app = express();
const path = require('path');

var deviceJson = require('../utils/deviceParser');
var deviceLog = require('../utils/deviceLog');
var deviceAction = require('../utils/deviceAction');

app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true,
	})
);
router.get('/new', function (req, res, next) {
	console.log(path.join(__dirname, '../public', 'views', 'register.html'));
	res.sendFile(path.join(__dirname, '../public', 'views', 'register.html'));
});
router.post('/new', function (req, res, next) {
	//write info to db tempfile
	//respond with 200
	//redirect to /devices
	const device = deviceJson.prepareDevice(req.body);
	deviceLog.update(device);
	res.redirect('/devices');
});

router.get('/edit', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public', 'views', 'edit.html'));
});
router.post('/edit', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/delete', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public', 'views', 'delete.html'));
});
router.delete('/delete', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/test', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../db', 'sample_devices.json'));
});

router.get('/all', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../db', 'devices.json'));
});

router.post('/execute', function (req, res, next) {
	console.log(
		req.body.deviceId,
		req.body.device_action_name,
		req.body.device_action_custom_params
	);
	const actionResponse = deviceAction.execute(
		req.body.deviceId,
		req.body.device_action_name,
		req.body.device_action_custom_params
	);
	res.redirect('/devices');
});

router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public', 'views', 'devices.html'));
});
module.exports = router;
