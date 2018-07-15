var APIUtil = (function() {

    var fn = new Function();

    fn.MSGs = [];
    fn.MSGs['SAVE_SUCCESS'] = 'Dados salvos com sucesso';
    fn.MSGs['NR_PROCESSO']  = 'Nº do processo: {0}';

    fn.DATE_FORMAT                          = [];
    fn.DATE_FORMAT['YYYY_MM_DD']            = 'YYYY-MM-DD';
    fn.DATE_FORMAT['DD_MM_YYYY']            = 'DD/MM/YYYY';
    fn.DATE_FORMAT['DD_MM_YYYY_HH_MM']      = 'DD/MM/YYYY HH:MM';
    fn.DATE_FORMAT['DD_MM_YYYY_HH_MM_SS']   = 'DD/MM/YYYY HH:MM:SS';
    fn.DATE_FORMAT['HH_MM']                 = 'HH:MM';
    fn.DATE_FORMAT['HH_MM_SS']              = 'HH:MM:SS';

    fn.formatMessage = function( messages, arrayValues ) {
console.log('AAA')
        var msg = '';
        if (! $.isArray(messages) ) {
            msg = messages;
        } else {
            $.each(messages, function() {
                msg = msg.concat(' ').concat( fn.MSGs[this] );
            });
        } 

        $.each(arrayValues, function( index ) {
            var r = new RegExp('\\{'+index+'\\}','g');
            msg = msg.replace( r, this );
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

    fn.log = function( msg ) {
        console.log(msg);
    }
    return Object.freeze( fn );
})();

module.exports = function() { return APIUtil };