var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3307',
        user: 'payment',
        password: 'payment',
        database: 'payment'
    });
}

module.exports = function () {    
    console.log('createDBConnection')
    console.log(createDBConnection);
    return createDBConnection;
}