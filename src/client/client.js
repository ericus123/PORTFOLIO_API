const publicVapidKey =
  "BBhvrQgpjqhPR-jX2vK-yn4GOZXCesj7f7W9kfrHbGzevQtgjZR5LflI-Gs4tnY32_mjKsR9lp2gpIwLPXbPDxU";

//check for service worker

if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err));
}
// register Service worker Push , send Push
async function send() {
  //Register service worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("Service worker Registered...");
  console.log("Service Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push Registered");
  //send push notification
  console.log("Sending push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push sent...");
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
