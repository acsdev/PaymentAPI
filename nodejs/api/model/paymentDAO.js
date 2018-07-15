function PaymentDAO(connection) {
    this._connection = connection;
}

PaymentDAO.prototype.save = function (pagamento, callback) {
    this._connection.query('INSERT INTO tb_payment SET ?', pagamento, callback);
}

PaymentDAO.prototype.findAll = function (callback) {
    this._connection.query('select * from tb_payment', callback);
}

PaymentDAO.prototype.findById = function (id, callback) {
    this._connection.query("select * from tb_payment where id = ?", [id], callback);
}

module.exports = function () {
    return PaymentDAO;
};