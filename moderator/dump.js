const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');
const { ensureModeratorSecretKey } = require('./util');

const sk = ensureModeratorSecretKey();
const moderator = ForgeSDK.Wallet.fromSecretKey(sk);
const json = moderator.toJSON();

console.log('moderator wallet', JSON.stringify(json, true, '  '));
console.log(
  `moderator pk base64: ${base64.escape(base64.encode(ForgeSDK.Util.hexToBytes(json.pk)))}`
);
