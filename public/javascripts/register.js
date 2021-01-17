// Add device action
function addDeviceAction() {
	var newActionForm = `<div class="action_wrapper">
  <div class="form-group">
    <label for="action_name"> Action Name </label>
    <input
      name="action_name"
      type="text"
      class="form-control"
      id="action_name"
      placeholder="Action name"
    />
  </div>
  <div class="form-group">
    <label for="action_method"> Action Method </label>
    <select
      class="form-control"
      id="action_method"
      name="action_method"
    >
      <option>GET</option>
      <option>POST</option>
    </select>
  </div>
  <div class="form-group">
    <label for="action_endpoint"> Action Endpoint </label>
    <input
      name="action_endpoint"
      type="url"
      class="form-control"
      id="action_endpoint"
      placeholder="Action endpoint"
    />
  </div>
  <div class="form-group">
    <label for="action_params"> Action Params </label>
    <input
      name="action_params"
      type="text"
      class="form-control"
      id="action_params"
      placeholder="Action params"
      value="{}"
    />
  </div>
  <div class="form-group">
    <label for="action_auth"> Action AUTH </label>
    <input
      name="action_auth"
      type="text"
      class="form-control"
      id="action_auth"
      placeholder="Action auth"
      value="{}"
    />
  </div>
</div>`;
	$('#extra_device_actions').append(newActionForm);
	var actionCount = parseInt($('#total_actions').text());
	if (actionCount >= 5) {
		window.alert('Maximum number of actions reached.');

		return;
	}
	console.log(actionCount);
	$('#total_actions').text(actionCount + 1);
	// $('#total_actions_form').value(actionCount + 1);
}
$('#add_device').click((e) => {
	e.preventDefault();
	addDeviceAction();
});
// End of add device action
