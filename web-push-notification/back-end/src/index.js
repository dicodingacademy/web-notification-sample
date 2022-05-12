const Hapi = require('@hapi/hapi');
const webpush = require('web-push');
const config = require('./config');

(async () => {
  // setup Vapid keys
  webpush.setVapidDetails('mailto:dimas@dicoding.com', config.vapidKeys.publicKey, config.vapidKeys.privateKey);

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  server.route([
    {
      method: 'POST',
      path: '/subscribe',
      handler: async (request) => {
        const subscription = request.payload;

        // mocking save subscription to database to target the user notifications
        config.subscriptionTarget = subscription;
        console.log('Subscription saved');

        return 'OK!';
      }
    },
    {
      method: 'GET',
      path: '/send/{message}',
      handler: async (request) => {
        const message = request.params.message;
        const payload = JSON.stringify({
          body: message,
        });

        await webpush.sendNotification(config.subscriptionTarget, payload);
        return 'OK!';
      }
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
})();
