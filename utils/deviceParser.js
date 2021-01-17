function generateRandomNum(len) {
	var num = '';
	for (var i = 0; i < len; i++) {
		var c = String(Math.floor(Math.random() * Math.floor(10)));
		num += c;
	}
	return num;
}

function prepareDevice(json) {
	const deviceName = json.device_name;
	const deviceType = json.device_type;
	const deviceStatus = 'active';
	const deviceId =
		deviceName.replace(/ /g, '_').toLowerCase() + generateRandomNum(5);
	const deviceIp = json.device_ip;
	var device = {
		deviceName: deviceName,
		deviceType: deviceType,
		deviceStatus: deviceStatus,
		deviceId: deviceId,
		deviceIp: deviceIp,
		actions: [],
	};
	// Make action number detection more efficient

	if (Array.isArray(json.action_name)) {
		for (var i = 0; i < json.action_name.length; i++) {
			var actionName = json.action_name[i].replace(/ /g, '_').toLowerCase();
			var actionMethod = json.action_method[i];
			var actionEndpoint = json.action_endpoint[i];
			var actionParams = JSON.parse(json.action_params[i]);
			var actionAuth = JSON.parse(json.action_auth[i]);
			console.log(
				actionName,
				actionMethod,
				actionEndpoint,
				actionParams,
				actionAuth
			);
			var device_action = {
				actionName: actionName,
				actionMethod: actionMethod,
				actionEndpoint: actionEndpoint,
				actiondParams: actionParams,
				actionAuth: actionAuth,
			};
			device.actions.push(device_action);
		}
	} else {
		var actionName = json.action_name.replace(/ /g, '_').toLowerCase();
		var actionMethod = json.action_method;
		var actionEndpoint = json.action_endpoint;
		var actionParams = JSON.parse(json.action_params);
		var actionAuth = JSON.parse(json.action_auth);
		console.log(actionName, actionMethod);
		var device_action = {
			actionName: actionName,
			actionMethod: actionMethod,
			actionEndpoint: actionEndpoint,
			actiondParams: actionParams,
			actionAuth: actionAuth,
		};
		device.actions.push(device_action);
	}
	console.log('Device created: ', JSON.stringify(device));
	return device;
}
function jsonifyParams(params) {
	if (params === '') {
		return {};
	}
	const paramsList = params.split(',');
	for (var i = 0; i < paramsList.length; i++) {
		console.log(paramsList[i]);
	}
}
module.exports.prepareDevice = prepareDevice;
module.exports.jsonifyParams = jsonifyParams;
