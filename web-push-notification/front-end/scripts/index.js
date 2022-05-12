(async () => {
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered!');
      } catch (e) {
        console.log('Service Worker registration failed: ', e);
      }
      return;
    }

    console.log('Service Worker not supported');
  }

  async function requestNotificationPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }

    if (Notification.permission === "denied") {
      alert("Permission for notifications was denied");
      return;
    }
  }

  async function subscribeUserToPush() {
    const swRegistration = await navigator.serviceWorker.ready;

    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BMs3FHQ_9QpO1P9acjDg5zmv3RNSx82uABdcV0orSZSPQSNs3czPuEXAeryRhxwb8lGuzwhWD7l8T48ANdMrtGU'),
    });

    await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    return {
      endpoint: subscription.endpoint,
      p256Key: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
      authKey: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
    }
  }


  await registerServiceWorker();
  await requestNotificationPermission();
  const subscriptionInfo = await subscribeUserToPush();

  console.log(subscriptionInfo);
})();