function PaymentDAO(connection) {
    this._connection = connection;
}

PaymentDAO.prototype.save = function (pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PaymentDAO.prototype.findAll = function (callback) {
    this._connection.query('select * from pagamentos', callback);
}

PaymentDAO.prototype.findById = function (id, callback) {
    this._connection.query("select * from pagamentos where id = ?", [id], callback);
}

module.exports = function () {
    return PaymentDAO;
};