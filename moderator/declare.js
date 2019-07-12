const ForgeSDK = require('@arcblock/forge-sdk');
const { ensureModeratorSecretKey } = require('./util');

ForgeSDK.connect('http://127.0.0.1:8210/api');

(async () => {
  const sk = ensureModeratorSecretKey();
  const moderator = ForgeSDK.Wallet.fromSecretKey(sk);
  console.log('moderator wallet', JSON.stringify(moderator.toJSON(), true, '  '));
  const hash = await ForgeSDK.sendDeclareTx({
    tx: {
      itx: { moniker: 'moderator' },
    },
    wallet: moderator,
  });
  console.log(`moderator declare hash ${hash}`);
})();
