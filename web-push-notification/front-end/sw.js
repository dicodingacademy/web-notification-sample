self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (pushEvent) => {
  const title = 'Push Notification';
  const { body } = pushEvent.data.json();

  const options = {
    body: body || 'Push message no payload',
  };

  self.registration.showNotification(title, options);
});