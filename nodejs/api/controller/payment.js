module.exports = function(app) {
    
    app.get('/payments', function(req, res) {
        res.send('OK');
    });

    app.post('/payments/payment', function(req, res) {
        
        let payment = req.body;
    
        req.assert("type",  "type is required.").notEmpty();
        req.assert("coin",  "coin is required").notEmpty();
        req.assert("value", "value is required and must be decimal value").notEmpty().isFloat();
        
        let errs = req.validationErrors();
        if (errs) {
            console.log("payment is not valid, see list of errs bellow");
            errs.forEach( msgObj => console.log(msgObj.msg) );
            //
            res.status(400).send(errs);
            return;
        }

        let conn = app.model.connectionFactory();
        let pDAO = new app.model.paymentDAO(conn);
        
        payment.status = 'CREATED';
        payment.date   = new Date();

        pDAO.save( payment, function(exception, result) {
            if ( exception ) {
                console.log( exception );
                res.status(400).json( exception );
                return;
            }
            res.location( app.utils.formatMessage(['/payments/payment/{0}'],  [result.insertId]));
            res.status(201).json( payment );
        });
    });
}
