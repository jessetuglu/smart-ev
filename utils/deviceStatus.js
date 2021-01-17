var ping = require('ping');
var fs = require('fs');
var path = require('path');
function check() {
	fs.readFile(
		path.join(__dirname, '..', 'db', 'devices.json'),
		'utf8',
		function (err, data) {
			if (err) {
				console.log(err);
			}
			var json = JSON.parse(data);
			json.forEach(function (device) {
				ping.sys.probe(device.deviceIp, (isAlive) => {
					console.log(isAlive);
					if (isAlive) {
						device.deviceStatus = 'active';
					} else {
						device.deviceStatus = 'off';
					}
				});
				console.log(device.deviceStatus);
			});
			fs.writeFile(
				path.join(__dirname, '..', 'db', 'devices.json'),
				JSON.stringify(json),
				() => {}
			);
		}
	);
}

module.exports.check = check;
