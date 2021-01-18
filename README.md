# Installation and Setup

1. Install node modules
2. Add a file named `devices.json` containing an empty list `[]` to the db folder.
3. Run node server on port 3000
4. Locate your device's local IP, and you can connect to the server from any device on the network via: `http://{your_local_ip}:3000`

# Registering a Device

1. Specify the name in the `name` field
2. Specify the full url endpoint to interact with device in the `url` field
3. Specify method in the `method` field
4. Specify the local IP of the device you are using. Typically starts with `192.168.1`
5. Specify the name of the action you would like to register with that device.
6. Click okay, and you are all set!

# Viewing your devices

1. The route `/devices` displays all current devices in a simple format.
2. The app will 'ping' these devices every 30s and update their status based on the response.

# Controlling your devices

1. Selecting from the list of actions of a device, you can simply click on one and have it execute.
2. Check logs for any errors

# Version History

- @v1.0.0
  - initial setup with localfile db
  - simple registration and action func
  - basic ui
