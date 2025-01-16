// import React, { useState, useEffect } from 'react';

import { useEffect } from "react";
import { useState } from "react";

function Front() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Store the event
      setShowInstallButton(true); // Show the install button
    });

    // Clean up the event listener
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null); // Clear the deferred prompt
        setShowInstallButton(false); // Hide the install button
      });
    }
  };

  return (
    <div>
      <h1>Welcome to Vow for You Thank you</h1>
      {/* Show the install button if it's available */}
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
      )}
    </div>
  );
}

export default Front;
