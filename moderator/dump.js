const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');

const { fromSecretKey } = ForgeSDK.Wallet;
const { bytesToHex, hexToBytes, isHexStrict } = ForgeSDK.Util;

function ensureModeratorSecretKey() {
  const sk = process.env.FORGE_MODERATOR_SK;
  if (!sk) {
    process.exit(1);
  }

  if (isHexStrict(sk)) {
    return sk;
  }

  return bytesToHex(Buffer.from(base64.unescape(sk), 'base64'));
}

const sk = ensureModeratorSecretKey();
const moderator = fromSecretKey(sk);
const json = moderator.toJSON();

console.log('moderator wallet', JSON.stringify(json, true, '  '));
console.log(`moderator pk base64: ${base64.escape(base64.encode(hexToBytes(json.pk)))}`);
