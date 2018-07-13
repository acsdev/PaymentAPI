module.exports = function(app) {

    app.get('/payments', function(req, res) {
        res.send('OK');
    });

    app.post('/payments/payment', function(req, res) {

        
        res.send( req.body );
    });
}
