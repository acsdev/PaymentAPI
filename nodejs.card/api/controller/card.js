var card = function( app ) {

    app.post("/card/check", function (req, res) {
        
        console.log('Checking... card data');

        var card = req.body;
        var response = { card: null, message : null};

        req.assert("number", "Number is required and must have 16 numeric characters.").notEmpty().len(16, 16);
        req.assert("flag", "Flag is required and must be MASTER or VISA.").notEmpty().isIn(['MASTER','VISA']);
        req.assert("expiration.year", "Year is required and must have 4 numeric characters.").notEmpty().len(4, 4);
        req.assert("expiration.month", "Month is required and must have 2 numeric characters.").notEmpty().len(2, 2);
        req.assert("cvv", "CVV is required and must have 3 numeric characters").notEmpty().len(3, 3);

        var errs = req.validationErrors();
        //
        card.status      = 'AUTORIZED';
        response.card    = card;
        response.message = [];
        if ( errs ) {
            card.status      = 'UNAUTORIZED';
            response.card    = card;
            response.message = errs;            
        }

        res.status( errs.length == 0 ? 201 : 400).json(response);
    });
}


module.exports = function( expressConfigured ) { return card( expressConfigured ); }