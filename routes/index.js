var express = require('express');
var router = express.Router();
var app = express();
const path = require('path');

app.use(express.static('public'));

router.get('/', function (req, res, next) {
	console.log(path.join(__dirname, '../public', 'views', 'index.html'));
	res.sendFile(path.join(__dirname, '../public', 'views', 'index.html'));
});

module.exports = router;
