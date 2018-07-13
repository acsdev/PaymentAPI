module.exports = function(app) {

    app.get('/payments', function(req, res) {
        res.send('OK');
    });

    app.post('/payments/payment', function(req, res) {
        var payment = req.body;
        console.log( app.model )
        var conn = app.model.connectionFactory();
        var pDAO = new app.model.paymentDAO(conn);
        
        pDAO.save( payment, function() {
            res.json( payment );
        });
    });
}
