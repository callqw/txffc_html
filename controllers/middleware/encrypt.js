const crypto = require('crypto');

function aesEncryptiv(data, key,iv) {
    const cipher = crypto.createCipher('aes192', key, iv);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecryptiv(encrypted, key,iv) {
    const decipher = crypto.createDecipher('aes192', key, iv);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function passEncrypt(pass) {
    const hmac = crypto.createHmac('sha256', 'Cdaslei156r5@!');
    hmac.update(pass);
    return hmac.digest('hex');
}
var data = 'admin';
var key = '192.168.1.12!';
var iv = 'match';
var encrypted = aesEncryptiv(data, key, iv);
var decrypted = aesDecryptiv(encrypted, key, iv);
module.exports = {
    aesEncryptiv: aesEncryptiv,
    aesDecryptiv: aesDecryptiv,
    passEncrypt:passEncrypt
}