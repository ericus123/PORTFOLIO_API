console.log("Service Worker Loaded");
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received...");
  self.registration.showNotification(data.title, {
    body: "Notified by AMANI Eric",
    icon: "https://unsplash.com/photos/HI6gy-p-WBI",
  });
});
