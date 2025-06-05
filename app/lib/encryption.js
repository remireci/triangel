// lib/encryption.js
import crypto from "crypto";

export const encryptNew = (plainText, secretKey) => {
    const key = crypto.createHash('sha256').update(secretKey).digest(); // 32-byte key
    const iv = crypto.createHash('md5').update(plainText).digest(); // 16-byte IV

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedBuffer = Buffer.concat([
        cipher.update(plainText, 'utf8'),
        cipher.final()
    ]);

    return {
        encrypted: encryptedBuffer.toString('hex'),
        iv: iv.toString('hex'),
    };
};
