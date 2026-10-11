/**
 * @file verify-encryption.js
 * @description Verifies AES-256-GCM encryption and decryption of catalog.json.enc using key 'gate'.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const key = 'gate';
const encPath = path.resolve('public/catalog.json.enc');

console.log('🔍 Testing AES-256 decryption of public/catalog.json.enc with key: "' + key + '"...');

const buffer = fs.readFileSync(encPath);
const salt = buffer.subarray(0, 16);
const iv = buffer.subarray(16, 28);
const tag = buffer.subarray(28, 44);
const ciphertext = buffer.subarray(44);

const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, iv);
decipher.setAuthTag(tag);

try {
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const parsed = JSON.parse(decrypted.toString('utf8'));
  console.log('✅ Successfully decrypted catalog.json.enc!');
  console.log(`   - App Name:    ${parsed.appName}`);
  console.log(`   - Total Notes: ${parsed.totalNotes}`);
  console.log(`   - Streams:     ${parsed.streams.map(s => s.key).join(', ')}`);
} catch (err) {
  console.error('❌ Decryption failed:', err.message);
  process.exit(1);
}
