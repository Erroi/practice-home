/**
 * Created by a1501 on 2017/9/12.
 */
const crypto = require('crypto');

//MD5 是一种常用的哈希算法，用于给任意数据一个'签名'，通常为十六进制的字符串。   //类似还有 sha1 sha256 sha512
const hash = crypto.createHash('md5');

hash.update('Hello world!');
hash.update('Hello nodeJs!');

console.log(hash.digest('hex'));


//AES 是一种常用的 对称加密算法，加解密都用同一个秘钥。
function aesEncrypt(data,key) {
    const cipher = crypto.createCipher('aes192',key);
    var crypted = cipher.update(data,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted,key) {
    const deciper = crypto.createDecipher('aes192',key);
    var decrypted = deciper.update(encrypted,'hex','utf8');
    decrypted += deciper.final('utf8');
    return decrypted;
}

var data = 'Hello,this is a secret message!';
var key = "password!";
var encrypted = aesEncrypt(data,key);
var decrypted = aesDecrypt(encrypted,key);

console.log('plain text:' + data);
console.log('Encrypted text:' + encrypted);
console.log('Decrypted text:' + decrypted);