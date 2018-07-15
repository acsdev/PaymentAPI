var APIUtil = (function() {

    var fn = new Function();

    fn.formatMessage = function( messages, values ) {
        
        var arrarOfMessage = Array.isArray( messages ) ? messages : [messages];
        var arrarOfValues  = Array.isArray( values ) ? values : [values];

        var msg = '';
        arrarOfMessage.forEach( m => msg = msg.concat(' ').concat( m ) );

        arrarOfValues.forEach( function( value, index ) {
            var r = new RegExp('\\{'+index+'\\}','g');
            msg = msg.replace( r, value );
        });

        return msg.trim();
    }

    /**
     * Forma dates
     */
    fn.formatDate = function( date, format ) {

        if ( !format ) {
            format = fn.DATE_FORMAT.DD_MM_YYYY
        }
        
        if ( !date ) {
            date = new Date();
        }

        var result = format
            .replace(/YYYY/g, date.getFullYear())
            .replace(/YY/g, new String( date.getFullYear() ).substring(2))
            .replace(/MM/g, new String( date.getMonth()+1 ).padStart(2,'0'))
            .replace(/DD/g, new String( date.getDate() ).padStart(2,'0'))
            .replace(/HH/g, new String( date.getHours() ).padStart(2,'0'))
            .replace(/MM/g, new String( date.getMinutes() ).padStart(2,'0'))
            .replace(/SS/g, new String( date.getSeconds() ).padStart(2,'0'));
        
        return result;
    }

    fn.isEditFieldKeys = function( key ) {
        // 8  - Backspace
        // 9  - Tab
        // 13 - Enter
        // 46 - Delete
        // 37,38,39,40 - Left/Up/Right/Down
        // 93 - ContextMenu
        var keys = [8,9,13,46,37,38,39,40];
        return keys.indexOf(key) > -1;
    };

    return Object.freeze( fn );
})();

module.exports = function() { return APIUtil };