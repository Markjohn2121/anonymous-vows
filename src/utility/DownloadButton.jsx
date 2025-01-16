// import React, { useState, useEffect } from 'react';

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useQueryParam from "./useQueryParam";

function DownloadButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const sectionParam = useQueryParam("section");
  const idParam = useQueryParam("id");
  const shareIdParam = useQueryParam("shareid");

  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Store the event
      setShowInstallButton(true); // Show the install button
    });

    // Clean up the event listener
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt
        setShowInstallButton(false); // Hide the install button
      });
    }
  };

  function isRunningAsPWA() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone
    );
  }

  return (
    <>
      {showInstallButton ? (
        <button onClick={handleInstallClick}>Install App</button>
      ) : !isRunningAsPWA() ? (
        sectionParam == "vfymessage" ? (
          <div>
            
            <Link to={`web+vfymessage://${shareIdParam}`}>open in app</Link>{" "}
          </div>
        ) : (
          <div>
            
            <Link to={`web+vfy${sectionParam}://${idParam}`}>open in app</Link>{" "}
          </div>
        )
      ) : null}
    </>
  );
}

export default DownloadButton;
