module.exports = function(app) {
    
    var _C = app.constants;

    var _getLocation = function ( id ) {
        return _C.ENDPOINT_NEW_PAYMENT + '/' + id;
    }

    app.get( _C.ENDPOINT_PAYMENTS, function(req, res) {
        
        let conn = app.model.connectionFactory();
        let pDAO = new app.model.paymentDAO(conn);
        
        // pDAO.deleteAll( function(exception) {
        //     if ( exception ) {
        //         console.log( exception );
        //         return res.status(500).json( exception );
        //     }
        //     res.send('OK');
        // });

        pDAO.findAll(function(error, success) {
            if ( error ) {
                res.status(400).json( error );
                return;
            }
            res.status(200).json( success );
        });
    });

    /**
     * ROUTE TO CREATE PAYMENTS
     */
    app.post( _C.ENDPOINT_NEW_PAYMENT, function(req, res) {
        
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
        var pDAO = new app.model.paymentDAO(conn);
        
        payment.status = 'CREATED';
        payment.date   = new Date();

        pDAO.save( payment, function(exception, resultINSERT) {
            if ( exception ) {
                console.log( exception );
                res.status(400).json( exception );
                return;
            }
            //
            //
            pDAO.findById(resultINSERT.insertId, function(error, resultFIND) {
                if ( error ) {
                    res.status(400).json( error );
                    return;
                }
                let payment = resultFIND[0];
                res.location( _getLocation(payment.id) );
                res.status(201).json( payment );
            });
        });
    });

    /**
     * ROUTE TO CANCEL OR CONFIRM A PAYMENT
     */
    app.put( _C.ENDPOINT_CONFIRM_CANCEL, function(req, res){

        req.assert("id",  "id is required and integer.").notEmpty().isInt();
        req.assert("operation",  "operation is required and must be CANCEL or CONFIRM.").notEmpty().isIn([ _C.STS_CONFIRM, _C.STS_CANCEL ]);
        let errs = req.validationErrors();
        if (errs) {
            console.log("id/operations is not valid, see list of errs bellow");
            errs.forEach( msgObj => console.log(msgObj.msg) );
            //
            res.status(400).send(errs);
            return;
        }

        var _ID  = parseInt(req.params.id);
        
        let conn = app.model.connectionFactory();
        let pDAO = new app.model.paymentDAO(conn);
    
        pDAO.cancelOrConfirm(_ID, req.params.operation, function(error, resultUPDATE) {
            if (error) {
              res.status(500).send(error);
              return;
            }
            //
            //
            pDAO.findById(_ID, function(error, resultFIND) {
                //
                if ( error ) {
                    res.status(400).json( error );
                    return;
                }
                //
                if (resultFIND.length == 0) {
                    res.status(500).json( {message: app.utils.formatMessage('Payment {0} not exists', _ID)} );
                    return;
                }
                //
                let payment = resultFIND[0];
                res.location( _getLocation(payment.id) );
                res.status(200).json( payment );
            });
        });
    
      });
}
