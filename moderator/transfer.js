const ForgeSDK = require('@arcblock/forge-sdk');
const { ensureModeratorSecretKey } = require('./util');

ForgeSDK.connect('http://127.0.0.1:8210/api');

(async () => {
  const sk = ensureModeratorSecretKey();
  const moderator = ForgeSDK.Wallet.fromSecretKey(sk);
  const receiver = ForgeSDK.Wallet.fromRandom();

  // Declare the receiver
  const hash = await ForgeSDK.sendDeclareTx({
    tx: {
      itx: { moniker: 'receiver' },
    },
    wallet: receiver,
  });
  console.log(`receiver declare hash ${hash}`);

  // Transfer to receiver
  const hash2 = await ForgeSDK.sendTransferTx({
    tx: {
      itx: {
        to: receiver.toAddress(),
        value: ForgeSDK.Util.fromTokenToUnit(10000),
      },
    },
    wallet: moderator,
  });
  console.log(`receiver transfer hash ${hash2}`);
})();
