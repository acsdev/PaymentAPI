var config = require('./api/config.js');

var expressConfigured = config();

expressConfigured.listen(3001, function() {
    console.log('server is up');
});