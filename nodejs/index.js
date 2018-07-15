var app = require('./api/config.js')();

app.listen(3000, function() {
    console.log('server is up');
});