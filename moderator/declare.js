const base64 = require('base64-url');
const ForgeSDK = require('@arcblock/forge-sdk');

const { fromSecretKey } = ForgeSDK.Wallet;
const { bytesToHex, isHexStrict } = ForgeSDK.Util;

ForgeSDK.connect('http://127.0.0.1:8210/api');

function ensureModeratorSecretKey() {
  const sk = process.env.FORGE_MODERATOR_SK;
  if (!sk) {
    console.error('please set FORGE_MODERATOR_SK to continue');
    process.exit(1);
  }

  if (isHexStrict(sk)) {
    return sk;
  }

  // debug('detected base64 moderator sk', base64.unescape(sk));
  return bytesToHex(Buffer.from(base64.unescape(sk), 'base64'));
}

(async () => {
  const sk = ensureModeratorSecretKey();
  const moderator = fromSecretKey(sk);
  console.log('moderator wallet', JSON.stringify(moderator.toJSON(), true, '  '));
  const hash = await ForgeSDK.sendDeclareTx({
    tx: {
      itx: { moniker: 'moderator' },
    },
    wallet: moderator,
  });
  console.log(`moderator declare hash ${hash}`);
})();
