const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  vapidKeys: {
    publicKey: 'BMs3FHQ_9QpO1P9acjDg5zmv3RNSx82uABdcV0orSZSPQSNs3czPuEXAeryRhxwb8lGuzwhWD7l8T48ANdMrtGU',
    privateKey: 'tHW3bB8Qcyzyma13p99IS0fhoPPzY1m9k9st11i0EDs'
  },
  subscriptionTarget: null,
}

module.exports = config;
