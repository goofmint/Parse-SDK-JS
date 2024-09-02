// import AES from 'crypto-js/aes';
// import ENC from 'crypto-js/enc-utf8';
import crypto from 'crypto';
const CryptoController = {
  encrypt(obj: any, secretKey: string): string {
    // encode the object as a string
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    const crypted = cipher.update(JSON.stringify(obj), 'utf-8', 'hex');
    return crypted + cipher.final('hex');
  },

  decrypt(encryptedText: string, secretKey: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    const decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    return decrypted + decipher.final('utf-8')
  },
};

// module.exports = CryptoController;
export default CryptoController;
