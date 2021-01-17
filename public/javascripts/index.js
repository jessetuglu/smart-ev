$(document).ready(function () {
	var deviceRequest = new XMLHttpRequest();
	deviceRequest.open('GET', '/devices/all', false);
	deviceRequest.send(null);
	const deviceRegistry = JSON.parse(deviceRequest.response);
	var totalDevices = deviceRegistry.length;
	var numOnline = 0;
	for (var i = 0; i < deviceRegistry.length; i++) {
		var device = deviceRegistry[i];
		if (device.deviceStatus === 'active') {
			numOnline += 1;
		}
	}
	console.log(numOnline);
	$('#total_devices').append(totalDevices);
	$('#online_devices').append(numOnline);
});
