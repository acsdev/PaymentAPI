var express = require('express');
var consign = require('consign');

var bodyparse        = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

app.use( bodyparse.urlencoded( {extended:true} ));
app.use( bodyparse.json() );

app.use( expressValidator() ); //AFTER BODY.PARSE

consign({ cwd: 'api' })
    .then('controller')
    .into(app);

module.exports = function() {
    return app;
}