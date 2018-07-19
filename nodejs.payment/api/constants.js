var APIConstants = (function() {

    var fn = new Function();

    fn.STS_CONFIRM            = 'CONFIRM';
    fn.STS_CANCEL             = 'CANCEL';

    fn.ENDPOINT_PAYMENTS           = '/payments';
    fn.ENDPOINT_NEW_PAYMENT        = '/payments/payment';
    fn.ENDPOINT_CONFIRM_CANCEL     = '/payments/payment/:id/:operation';

    return Object.freeze( fn );
})();

module.exports = function() { return APIConstants };