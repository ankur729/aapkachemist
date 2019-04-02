// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '538695932187'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  
  // if (payload.data.readdata == undefined) {
  //   this.launch_toast(payload.data, 1);
  // }
  // else {
  //   this.launch_toast(JSON.parse(payload.data.readdata), 2);
  // }
 

  var notificationTitle = JSON.parse(payload.data.readdata).title;
  var notificationOptions = {
      body: JSON.parse(payload.data.readdata).message,
      icon:'./assets/images/marker.png',
      image:JSON.parse(payload.data.readdata).banner,
      tag: 'renotify',
      renotify: true,
      requireInteraction: true
  };
  return self.registration.showNotification(notificationTitle,
  notificationOptions);
  // console.log(payload);
  // var data = JSON.parse(payload);
  // self.registration.showNotification(data.title, {
  //     body: data.body,
  //     icon: data.icon,
  //     click_action: data.click_action,
  //     time_to_live: data.time_to_live,
  //     data: data.data,
  //     tag: data.tag
  // });
});
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('Received background message ', payload);
//   let payload=JSON.parse(payload.data.readdata);
//   const notificationTitle = 'Background Message Title';
//   // here you can override some options describing what's in the message; 
//   // however, the actual content will come from the Webtask
//   const notificationOptions = {
     
//     body: payload.message,
    
//   };

//   self.addEventListener('push', function(event) {
//     console.log('Received a push message', event);
  
//     var title = 'Yay a message.';
//     var body = 'We have received a push message.';
//     var icon = 'YOUR_ICON';
//     var tag = 'simple-push-demo-notification-tag';
//     var data = {
//       doge: {
//           wow: 'such amaze notification data'
//       }
//     };
  
//     event.waitUntil(
//       self.registration.showNotification(title, {
//         body: body,
       
//         tag: tag,
//         data: data
//       })
//     );
//   });

// //  return self.registration.showNotification(notificationTitle, notificationOptions);
// });