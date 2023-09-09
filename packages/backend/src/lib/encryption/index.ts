import { KeySchedule } from './types';
import { cipher, keyExpansion } from './utils';

export class Encrypter {
  blockSize = 16;
  key = 'TEST';

  constructor(encryptionKey: string) {
    this.key = encryptionKey;
  }

  encrypt(plaintext: string, nBits = 256) {
    if (!(nBits == 128 || nBits == 192 || nBits == 256)) return '';
    const nBytes = nBits / 8;
    const pwBytes: Array<number> = new Array(nBytes);

    for (let i = 0; i < nBytes; i++)
      pwBytes[i] = +isNaN(this.key.charCodeAt(i)) ? 0 : this.key.charCodeAt(i);

    let key = cipher(pwBytes, keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes - 16));

    const counterBlock = new Array(this.blockSize);

    const nonce = new Date().getTime();
    const nonceMs = nonce % 1000,
      nonceSec = Math.floor(nonce / 1000),
      nonceRnd = Math.floor(Math.random() * 0xffff);

    for (let i = 0; i < 2; i++) counterBlock[i] = (nonceMs >>> (i * 8)) & 0xff;
    for (let i = 0; i < 2; i++)
      counterBlock[i + 2] = (nonceRnd >>> (i * 8)) & 0xff;
    for (let i = 0; i < 4; i++)
      counterBlock[i + 4] = (nonceSec >>> (i * 8)) & 0xff;

    let ctrTxt = '';
    for (let i = 0; i < 8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

    const keySchedule: KeySchedule = keyExpansion(key);

    const blockCount = Math.ceil(plaintext.length / this.blockSize);
    const ciphertxt = new Array(blockCount);

    for (let b = 0; b < blockCount; b++) {
      for (let c = 0; c < 4; c++) counterBlock[15 - c] = (b >>> (c * 8)) & 0xff;
      for (let c = 0; c < 4; c++)
        counterBlock[15 - c - 4] = (b / 0x100000000) >>> (c * 8);

      const cipherCntr = cipher(counterBlock, keySchedule);

      const blockLength =
        b < blockCount - 1
          ? this.blockSize
          : ((plaintext.length - 1) % this.blockSize) + 1;
      const cipherChar = new Array(blockLength);

      for (let i = 0; i < blockLength; i++) {
        cipherChar[i] =
          cipherCntr[i] ^ plaintext.charCodeAt(b * this.blockSize + i);
        cipherChar[i] = String.fromCharCode(cipherChar[i]);
      }
      ciphertxt[b] = cipherChar.join('');
    }

    let ciphertext = ctrTxt + ciphertxt.join('');
    ciphertext = Buffer.from(ciphertext).toString('base64');
    return ciphertext;
  }

  dencrypt(encryptedText: string, nBits = 256) {
    const blockSize = 16;
    if (!(nBits == 128 || nBits == 192 || nBits == 256)) return '';
    encryptedText = Buffer.from(encryptedText, 'base64').toString('utf-8');

    const nBytes = nBits / 8;
    const pwBytes = new Array(nBytes);

    for (let i = 0; i < nBytes; i++) {
      pwBytes[i] = isNaN(this.key.charCodeAt(i)) ? 0 : this.key.charCodeAt(i);
    }
    let key = cipher(pwBytes, keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes - 16));

    const counterBlock = new Array(8);
    for (let i = 0; i < 8; i++)
      counterBlock[i] = encryptedText.slice(0, 8).charCodeAt(i);

    const keySchedule = keyExpansion(key);

    const nBlocks = Math.ceil((encryptedText.length - 8) / blockSize);
    const ct = new Array(nBlocks);
    for (let b = 0; b < nBlocks; b++)
      ct[b] = encryptedText.slice(
        8 + b * blockSize,
        8 + b * blockSize + blockSize
      );

    const plaintxt = new Array(ct.length);

    for (let b = 0; b < nBlocks; b++) {
      for (let c = 0; c < 4; c++) counterBlock[15 - c] = (b >>> (c * 8)) & 0xff;
      for (let c = 0; c < 4; c++)
        counterBlock[15 - c - 4] =
          (((b + 1) / 0x100000000 - 1) >>> (c * 8)) & 0xff;
      const cipherCntr = cipher(counterBlock, keySchedule);
      const plaintxtByte = new Array(ct[b].length);
      for (let i = 0; i < ct[b].length; i++) {
        plaintxtByte[i] = cipherCntr[i] ^ ct[b].charCodeAt(i);
        plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
      }
      plaintxt[b] = plaintxtByte.join('');
    }

    return plaintxt.join('');
  }
}
