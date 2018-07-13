var express = require('express');
var consign = require('consign');
var bdparse = require('body-parser');

module.exports = function() {

    var app = express();

    app.use( bdparse.urlencoded( {extended:true} ));
    app.use( bdparse.json() );

    consign()
        .include('controller')
        .into(app);

    return app;
}