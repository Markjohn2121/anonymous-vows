import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useMessages = (userId) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const messagesRef = ref(db, `users/${userId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messagesArray = Object.entries(data).map(([id, messageData]) => ({
          id,
          ...messageData,
        }));
        setMessages(messagesArray.reverse()); // Reverse to show the latest message first

        // Trigger push event when a new message arrives
        if (messagesArray.length > 0) {
          const lastMessage = messagesArray[0]; // Latest message
          sendPushEventToServiceWorker(lastMessage); // Send data to service worker
        }
      } else {
        setMessages([]);
      }
    }, (error) => {
      setError(error.message);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [userId]);

  // Send push data to the service worker
  const sendPushEventToServiceWorker = (message) => {
    if (Notification.permission === 'granted') {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
       
        // navigator.serviceWorker.controller.postMessage({
        //   type: 'PUSH_NOTIFICATION',
        //   payload: {
        //     title: 'New Message',
        //     body: message.vow,
        //     icon: '/icon/icon_192.png',
        //   },
        // });
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('Service Worker registered:', registration);
        }).catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
        

        navigator.serviceWorker.ready.then((registration) => {
          if (registration.active) {
            console.log('Sending push data to service worker:', message);
            // Send the message only if the service worker is active
            registration.active.postMessage({
              type: 'PUSH_NOTIFICATION',
              payload: {
                title: 'New Message',
                body: message.vow,
                icon: '/icon/icon_192x192.png',
              },
            });
          }
        });
        

        
      }
    } else {
      console.log('Notification permission is not granted');
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('Notification permission denied.');
          }
        });
      } else {
        console.log('Notifications are not supported in this browser.');
      }
      
    }
  };
  

  return { messages, error };
};

export default useMessages;
