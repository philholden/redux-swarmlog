import supercop from '../supercop.js'

import crypto from 'crypto'

export default function generateKeys() {
  return require('../keys-old.json')
  const keys = supercop.createKeypair()
  return {
    curve: `ed25519`,
    public: `${keys.pubKey.toString('base64')}.ed25519`,
    private: `${keys.privKey.toString('base64')}.ed25519`,
    id: `@${keys.pubKey.toString('base64')}.ed25519`,
//    id: crypto.createHash('sha256').update(keys.pubKey).digest('base64')+'.sha256',
    hashKey: crypto.createHash('sha256').update(keys.pubKey).digest('hex'),
  }
}
