var express = require('express');
var consign = require('consign');

var bodyparse        = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {

    var app = express();

    app.use( bodyparse.urlencoded( {extended:true} ));
    app.use( bodyparse.json() );

    app.use( expressValidator() ); //AFTER BODY.PARSE

    consign({ cwd: 'api' })
        .then('utils.js')
        .then('constants.js')
        .then('controller')
        .then('model')
        .into(app);

    return app;
}