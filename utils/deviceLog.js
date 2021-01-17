var fs = require('fs');
const path = require('path');

function update(newDevice) {
	console.log(newDevice);
	fs.readFile(
		path.join(__dirname, '..', 'db', 'devices.json'),
		'utf8',
		function (err, data) {
			var json = JSON.parse(data);
			json.push(newDevice);

			fs.writeFile(
				path.join(__dirname, '..', 'db', 'devices.json'),
				JSON.stringify(json),
				() => {}
			);
		}
	);
}
module.exports.update = update;
