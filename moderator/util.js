const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');

const { fromSecretKey } = ForgeSDK.Wallet;
const { bytesToHex, isHexStrict } = ForgeSDK.Util;

function ensureModeratorSecretKey() {
  const sk = process.env.FORGE_MODERATOR_SK;
  if (!sk) {
    console.error('please set FORGE_MODERATOR_SK to continue');
    process.exit(1);
  }

  if (isHexStrict(sk)) {
    return sk;
  }

  return bytesToHex(Buffer.from(base64.unescape(sk), 'base64'));
}

function ensureModerator() {
  const sk = ensureModeratorSecretKey();
  const moderator = fromSecretKey(sk);
  return moderator;
}

exports.ensureModerator = ensureModerator;
exports.ensureModeratorSecretKey = ensureModeratorSecretKey;
