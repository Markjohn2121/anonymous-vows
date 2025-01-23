// import { use } from "react";
import { db } from "../firebase";
import { ref, set, get, push } from "firebase/database";


import React, { useState, useEffect } from "react";
import { use } from 'react';

const checkDateFromInternet = async () => {
  const apiKey = 'ZZXQ1ERRJR7N'; // Replace with your TimeZoneDB API key
  const timezone = 'Asia/Manila';
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${timezone}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const currentDate = new Date(data.formatted);
      return isFebruary14OrLater(currentDate);
    } else {
      console.error("Failed to fetch the date from the API");
      return localDateAsFallback();
    }
  } catch (error) {
    console.error("Error fetching the date:", error);
    return localDateAsFallback();
  }
};

// Helper function to check if the date is February 14 or later
const isFebruary14OrLater = (date) => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
  const day = date.getDate();
  //console.log(month > 1 || (month === 1 && day >= 20))
  return (month >= 2 && day >= 14);
};

// Fallback function to use the local date
const localDateAsFallback = () => {
  //console.log("Using local date as fallback");
  const localDate = new Date();
  return isFebruary14OrLater(localDate);
};












// const fetchAccurateLocation = async () => {
//   const API_KEY = "AIzaSyCEPNninNmJrzzx-pfTs2VRnHfA6sXL5YU"; // Replace with your actual API key

//   try {
//     const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       //console.log("Accurate Location:", data.location);
//       //console.log("Latitude:", data.location.lat);
//       //console.log("Longitude:", data.location.lng);
//     } else {
//       console.error("Error fetching location:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };

// fetchAccurateLocation();





// Function to get the current date and time with AM/PM format
const getCurrentDateTime = (get = 'full') => {
  const now = new Date();
  
  // Format the date: DD/MM/YYYY
  const date = now.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Format the time: HH:MM AM/PM
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Enable AM/PM format
  });

  if(get == 'time') return time;
  if(get == 'date') return date;
  if(get == 'full') return `${date} ${time}`;

  
}

// Function to get current location (latitude and longitude)
const getCurrentLocation = async (onSuccess, onError) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        //console.log(position.coords)
        try {
          const locationName = await reverseGeocode(latitude, longitude);
          onSuccess(locationName);
        } catch (error) {
          onError("Unknown");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        onError("Unknown");
      }
    );
  } else {
    onError("Unknown");
  }
};

// Function to reverse geocode latitude and longitude to a human-readable address
const reverseGeocode = async (latitude, longitude) => {
  const apiKey = "e8bf495240874e469d5bf08e2e0e6bd2"; // Replace with your OpenCage API key
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  );
  const data = await response.json();
  const components = data.results[0].components;
  const barangay = components.suburb || components.village || components.neighbourhood || '--';
  const city = components.city || components.town || components.village || '--';
  const state = components.state || '--';
  const country = components.country || '--';

return barangay +", " + city +" " + state
  // return data.results[0]?.formatted || "Unknown location";
};

// Main component
// const App = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [location, setLocation] = useState("");

//   useEffect(() => {
//     // Set current date
//     setCurrentDate(getCurrentDate());

//     // Fetch current location
//     getCurrentLocation(
//       (locationName) => setLocation(locationName),
//       (errorMessage) => setLocation(errorMessage)
//     );
//   }, []);

//   return (
//     <div>
//       <p>Current Date: {currentDate}</p>
//       <p>Current Location: {location}</p>
//     </div>
//   );
// };


















// Check if session exists and navigate to a new URL if it does
const checkSessionAndNavigate = (location) => {
  const sessionInfo = getSession();

  if (location == "login") {
    if (sessionInfo.exists) {
      //console.log("Session exists. Navigating to new URL.");
      window.location.replace("/?section=profile&id=" + sessionInfo.data.userId);
    } else {
      //console.log("No session found.");
      // window.location.replace('/me/login'); // Replace '/dashboard' with your target URL
    }
  } else if (location == "profile") {
    if (sessionInfo.exists) {
      //console.log("Session exists. Navigating to new URL.");

      window.location.replace('/me/profile?='+sessionInfo.data.userId); // Replace '/dashboard' with your target URL
    } else {
      //console.log("No session found.");
      window.location.replace("/?section=login"); // Replace '/dashboard' with your target URL
    }
  }else if (location == "home") {
    if (sessionInfo.exists) {
      //console.log("Session exists. Navigating to new URL.");

      window.location.replace('/?section=profile&id='+sessionInfo.data.userId); // Replace '/dashboard' with your target URL
    } else {
      //console.log("No session found.");
      // /window.location.replace("/?section=login"); // Replace '/dashboard' with your target URL
    }
  }else{
    window.location.replace("/?section=login"); // Replace '/dashboard' with your target URL
  }
};

// Set session data with a return value
const setSession = (userData) => {
  try {
    localStorage.setItem("userVFYSession", JSON.stringify(userData));
    return { success: true, message: "Session set successfully." };
  } catch (error) {
    console.error("Error setting session:", error);
    return { success: false, message: "Failed to set session." };
  }
};

// Get session data and return true if session exists, false otherwise, along with the session values
const getSession = () => {
  const session = localStorage.getItem("userVFYSession");
  if (session !== null || session != null) {
    return { exists: true, data: JSON.parse(session) };
  } else {
    return { exists: false, data: null };
  }
};

// Remove session data with a return value
const clearSession = () => {
  try {
    localStorage.removeItem("userVFYSession");
    return { success: true, message: "Session cleared successfully." };
  } catch (error) {
    console.error("Error clearing session:", error);
    return { success: false, message: "Failed to clear session." };
  }
};

const checkUsername = async (username, timeout = 5000) => {
  // Timeout promise
  let isTimedOut = false;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      isTimedOut = true;
      reject(new Error("Request timed out"));
    }, timeout)
  );

  const usersRef = ref(db, "users");

  // Firebase get request promise
  const getPromise = get(usersRef)
    .then((snapshot) => {
      if (isTimedOut) return; // If the timeout is triggered, abort the operation

      if (snapshot.exists()) {
        const data = snapshot.val();
        const userIds = Object.keys(data);

        if (!Array.isArray(userIds)) {
          return { isExist: false, err: true, message: "userIds is not an array" };
        }

        const isUsernameInIds = userIds.some((id) => id.startsWith(username + "-"));
        const userid = userIds.filter((id) => id.startsWith(username + "-"));

        return { isExist: isUsernameInIds, id: userid[0], err: false, message: "Success" };
      } else {
        return { isExist: false, err: false, message: "No data available" };
      }
    })
    .catch((error) => {
      console.error(error);
      return { isExist: false, err: true, message: error.message };
    });

  // Race the timeout and getPromise
  try {
    return await Promise.race([getPromise, timeoutPromise]);
  } catch (error) {
    console.error(error);
    return { isExist: false, err: true, message: "Request timed out" };
  }
};




const getAllUsers = async () => {
  //console.log("Get all users");
  const usersRef = ref(db, "users");

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const userIds = Object.keys(data); // This should be an array
      // //console.log(userIds); // Log to check if it's an array
      return userIds;
    } else {
      //console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const isUserExists = (userId, timeout = 5000) => {
  const userRef = ref(db, `users/${userId}`);
  let isTimedOut = false;

  // Create a promise for the timeout
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      isTimedOut = true;
      reject(new Error("Request timed out"));
    }, timeout)
  );

  // Create the get promise
  const getPromise = get(userRef).then((snapshot) => {
    if (!isTimedOut) {
      if (snapshot.exists()) {
        return { user: true, err: false };
      } else {
        return { user: false, err: false };
      }
    }
  });

  // Race the get promise against the timeout promise
  return Promise.race([getPromise, timeoutPromise]).catch((error) => ({
    user: false,
    err: true,
    message: error.message,
  }));
};


const createUser = async (data, timeout = 5000) => {
  let isTimedOut = false;
  const result = await checkUsername(data.username);


if(result.err) return { success: false, err: true };
if(result.isExist) return { success: false, err: false, message: 'Username already used!' };


  // Create a promise for the timeout
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      isTimedOut = true;
      reject(new Error("Request timed out"));
    }, timeout)
  );

  // Main create user logic
  const userId = data.username + "-" + new Date().toISOString().replace(/[:.-]/g, "");
  const createUserPromise = set(ref(db, `users/${userId}/info`), {
              name: "anonymous",
              username: data.username,
              password: data.password,
              note: '',
            }).then(() =>{
              if(!isTimedOut){
                setSession({ userId: userId, username: data.username });
                return { success: true, err: false, id: userId };
              }
            });

            
  // Race the promises
  return Promise.race([createUserPromise, timeoutPromise])
    .then((result) => result)
    .catch((error) => ({ success: false, err: true, message: error.message }));
};








const createMessage = (userId, data, timeout = 5000) => {
  const messagesRef = ref(db, `users/${userId}/messages`);
  let isTimedOut = false;

  // Create a promise for the timeout
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      isTimedOut = true;
      reject(new Error("Request timed out"));
    }, timeout)
  );

  // Create the push promise
  const pushPromise = push(messagesRef, {
    vow: data.message,
    location: data.location,
    nickname: data.nickname,
    date: data.date,
  }).then(() => {
    if (!isTimedOut) {
      return { success: true, message: "Message successfully written!" };
    }
  });

  // Race the push promise against the timeout promise
  return Promise.race([pushPromise, timeoutPromise]).catch((error) => ({
    success: false,
    message: error.message === "Request timed out" ? "Request timed out" : "Failed to write message.",
    error: error,
  }));
};


const readUser = async (data, timeout = 5000) => {
  //console.log("Read user");

  const result = await checkUsername(data.username);

  if (result.isExist) {
    const userRef = ref(db, `users/${result.id}/info`);

    // Timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );

    // Firebase get request promise
    const getPromise = get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
      
        if (snapshot.val().password === data.password) {
          setSession({ userId: result.id, username: data.username });
          window.location.replace("/?section=profile");
          return { isExist: true, err: false, message: "Success" };
        } else {
          return {
            isExist: false,
            err: false,
            message: "Username or password is incorrect",
          };
        }
      }
      return {
        isExist: true,
        err: false,
        message: "Username or password is incorrect",
      };
    });

    // Race the timeout promise against the get promise
    return Promise.race([getPromise, timeoutPromise]).catch((error) => ({
      isExist: false,
      err: true,
      message: error.message,
    }));
  } else {

    if(result.err){
      return { isExist: false, err: true, message: "Something went wrong" };
    }
    //console.log("User does not exist");
    return { isExist: false, err: false, message: "Username or password is incorrect" };
  }
};






const getNote = async (id, timeout = 5000) => {
  const userRef = ref(db, `users/${id}/info`);

  // Timeout promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  // Firebase get request promise
  const getPromise = get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().note;
    }
    return '';
  });

  // Race the timeout promise against the get promise
  return Promise.race([getPromise, timeoutPromise]).catch((error) => {
    console.error(error);
    return '';
  });
};

const updateUserNote = async (id, note, timeout = 5000) => {
  const userRef = ref(db, `users/${id}/info/note`);

  // Timeout promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  // Firebase set request promise
  const setPromise = set(userRef, note )
    .then(() => {
      return { success: true, err:false, message: "Note successfully written!" };
    })
    .catch((error) => {
      console.error(error);
      return { success: false, err:false, message: "Something went wrong" };
    });

  // Race the timeout promise against the set promise
  return Promise.race([setPromise, timeoutPromise]).catch((error) => ({
    success: false,
    err:true,
    message: error.message,
  }));
};

const getMessage = async (userId,messageId, timeout = 5000) => {
  const messagesRef = ref(db, `users/${userId}/messages/${messageId}`);

  // Timeout promise
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  // Firebase get request promise
  const getPromise = get(messagesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
   
      return { success: true, data:data };
    }
    return { success: false, message: "No messages found." };
  });

  // Race the timeout promise against the get promise
  return Promise.race([getPromise, timeoutPromise]).catch((error) => ({
    success: false,
    message: error.message,
  }));
};





  // const getMessage = async (userId, timeout = 5000) => {
  //   const messagesRef = ref(db, `users/${userId}/messages`);

  //   // Timeout promise
  //   const timeoutPromise = new Promise((_, reject) =>
  //     setTimeout(() => reject(new Error("Request timed out")), timeout)
  //   );

  //   // Firebase get request promise
  //   const getPromise = get(messagesRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       const messageIds = Object.keys(data); // Extract the message IDs
  //       return { success: true, messageIds };
  //     }
  //     return { success: false, message: "No messages found." };
  //   });

  //   // Race the timeout promise against the get promise
  //   return Promise.race([getPromise, timeoutPromise]).catch((error) => ({
  //     success: false,
  //     message: error.message,
  //   }));
  // };







const readMessage = () => {
  //console.log("Read message");
};

const updateUser = () => {
  //console.log("Update user");
};

const updateMessage = () => {
  //console.log("Update message");
};

const deleteUser = () => {
  //console.log("Delete user");
};

const deleteMessage = () => {
  //console.log("Delete message");
};

export {
  createUser,
  createMessage,
  readUser,
  readMessage,
  updateUser,
  updateMessage,
  deleteUser,
  deleteMessage,
  checkUsername,
  getAllUsers,
  isUserExists,
  getSession,
  clearSession,
  checkSessionAndNavigate,
  getNote,
  getCurrentDateTime,
  getCurrentLocation,
 
  updateUserNote,
  getMessage,
  checkDateFromInternet,
};
