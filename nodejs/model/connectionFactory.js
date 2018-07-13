var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'payment',
        password: 'payment',
        database: 'payment'
    });
}

module.exports = function () {
    return createDBConnection;
}