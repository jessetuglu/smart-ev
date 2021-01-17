// Load Devices

$(document).ready(function () {
	var deviceRequest = new XMLHttpRequest();
	deviceRequest.open('GET', '/devices/all', false);
	deviceRequest.send(null);
	const deviceRegistry = JSON.parse(deviceRequest.response);
	console.log(deviceRegistry);
	for (var i = 0; i < deviceRegistry.length; i++) {
		var device = deviceRegistry[i];
		var device_html =
			`
    <div class="device_wrapper mx-auto container">
    <div class="device_name">Device Name: <span>` +
			device.deviceName +
			`</span></div>
    <div class="device_type">Device Type: <span> ` +
			device.deviceType +
			`</span></div>
    <div class="device_status">Device Status: ` +
			addDeviceStatus(device) +
			`</div>
    <form class="device_action_form" method="POST" action="/devices/execute">
      <label for="device_action_selection">Select action</label>
      <select
        id="device_action_selection"
        class="device_action_selection form-control action_form_segment"
        name="device_action_name"
      >` +
			addActionSelections(device) +
			`
      </select>
      <label for="device_action_selection">Custom params</label>
      <input type="text" class="form-control action_form_segment" name="device_action_custom_params" placeholder="Custom params" value="{}"/>
      <input type="hidden" name="deviceId" value="` +
			device.deviceId +
			`"/>
      <button type="submit" class="btn btn-primary" id="device_execute_action" onclick="executeAction()">Execute Action</button>
    </form>
  </div>`;
		$('#device_list_container').append(device_html);
	}
});

function addDeviceStatus(device) {
	if (device.deviceStatus === 'active') {
		return '<span class="active_status">active</span>';
	} else {
		return '<span class="inactive_status">off</span>';
	}
}
function addActionSelections(device) {
	var actionSelector = ``;
	for (var i = 0; i < device.actions.length; i++) {
		var action = device.actions[i];
		var selection = `<option>` + action.actionName + `</option>`;
		actionSelector += selection;
	}
	return actionSelector;
}
// End of Load Devices

// Action handler
function executeAction() {}
$('#device_execute_action').click((e) => {
	e.preventDefault();
	executeAction(deviceId);
});

// End of action handler
