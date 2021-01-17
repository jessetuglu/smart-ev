const axios = require('axios');
var fs = require('fs');
const path = require('path');
const { response } = require('../app');

function execute(device_id, action_name, custom_params) {
	// pretty sure readFile is faster than /devices/all, need to test
	fs.readFile(
		path.join(__dirname, '..', 'db', 'devices.json'),
		'utf8',
		function (err, data) {
			if (err) {
				console.log(err);
			}
			var json = JSON.parse(data);
			for (var i = 0; i < json.length; i++) {
				var deviceId = json[i].deviceId;

				if (deviceId === device_id) {
					for (var j = 0; j < json[i].actions.length; j++) {
						var action = json[i].actions[j];
						if (action.actionName === action_name) {
							if (action.actionMethod === 'GET') {
								axios
									.get(
										action.actionEndpoint,
										action.actionParams + custom_params,
										action.actionAuth
									)
									.then((response) => {
										return response;
									})
									.catch((err) => {
										console.log(err);
										return err;
									});
							} else {
								axios
									.post(
										action.actionEndpoint,
										action.actionParams + JSON.parse(custom_params),
										action.actionAuth
									)
									.then((response) => {
										return response;
									})
									.catch((err) => {
										console.log(err);
										return err;
									});
							}
						}
					}
				}
			}
		}
	);
}
module.exports.execute = execute;
