(() => {
  const showNotification = document.getElementById('showNotification');
  const seconds = document.getElementById('seconds');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');

  let intervalId = null;

  async function notify() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission !== 'granted') {
      const permissionStatus = await Notification.requestPermission();

      if (permissionStatus !== 'granted') {
        alert('Permission to show notification was denied');
        return;
      }
    }

    new Notification('Hello notification', { body: 'This is a body notification' });
  }

  function startInterval() {
    intervalId = setInterval(async () => {
      await notify();
    }, Number(seconds.value) * 1000);

    start.disabled = true;
  }

  function stopInterval() {
    clearInterval(intervalId);
    start.disabled = false;
  }

  showNotification.addEventListener('click', notify);
  start.addEventListener('click', startInterval);
  stop.addEventListener('click', stopInterval);
})();