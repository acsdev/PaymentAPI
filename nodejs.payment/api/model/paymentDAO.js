function PaymentDAO(connection) {
    this._connection = connection;
}
//TODO TMP Method. Will be removed later.
PaymentDAO.prototype.deleteAll = function (callback) {
    this._connection.query('DELETE FROM tb_payment', callback);
}

PaymentDAO.prototype.findAll = function (callback) {
    this._connection.query('SELECT * FROM tb_payment', callback);
}

PaymentDAO.prototype.findById = function (id, callback) {
    this._connection.query("SELECT * FROM tb_payment WHERE id = ?", [id], callback);
}

PaymentDAO.prototype.save = function (pagamento, callback) {
    this._connection.query('INSERT INTO tb_payment SET ?', pagamento, callback);
}

PaymentDAO.prototype.cancelOrConfirm = function (id, status, callback) {
    this._connection.query('UPDATE tb_payment SET status = ? WHERE id = ?', [status, id], callback);
}

module.exports = function () {
    return PaymentDAO;
};