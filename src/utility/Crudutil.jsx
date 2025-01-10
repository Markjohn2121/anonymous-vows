// import { use } from "react";
import { db } from "../firebase";
import { ref, set, get, push } from "firebase/database";



// Check if session exists and navigate to a new URL if it does
const checkSessionAndNavigate = (location) => {

  const sessionInfo = getSession();

if(location == 'login'){
  if (sessionInfo.exists) {

    console.log("Session exists. Navigating to new URL.");
window.location.replace('/me/profile?id='+sessionInfo.data.userId); 
  
  } else {
    console.log("No session found.");
    // window.location.replace('/me/login'); // Replace '/dashboard' with your target URL
  }

}else if(location == "profile"){

  if (sessionInfo.exists) {

    console.log("Session exists. Navigating to new URL.");

    // window.location.replace('/me/profile?='+sessionInfo.data.userId); // Replace '/dashboard' with your target URL
  } else {
    console.log("No session found.");
    window.location.replace('/me/login'); // Replace '/dashboard' with your target URL
  }

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
  if (session !== null) {
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





const checkUsername = async (username) => {
  console.log("Get all users");
  const usersRef = ref(db, "users");

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const userIds = Object.keys(data); // This should be an array
      // console.log(userIds); // Log to check if it's an array

      console.log(`Checking if username ${username} exists in user IDs`);

      if (!Array.isArray(userIds)) {
        console.error("userIds is not an array");
        return false;
      }

      const isUsernameInIds = userIds.some((id) =>
        id.startsWith(username + "-")
      );
      const userid = userIds.filter((id) => id.startsWith(username + "-"));
   

      console.log(`Is username ${username} in user IDs: ${isUsernameInIds}`);
      return [isUsernameInIds, userid];
    } else {
      console.log("No data available");
      return [false, "No data available"];
    }
  } catch (error) {
    console.error(error);
    return [ false, "Error"];
  }
};

const getAllUsers = async () => {
  console.log("Get all users");
  const usersRef = ref(db, "users");

  try {
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const userIds = Object.keys(data); // This should be an array
      // console.log(userIds); // Log to check if it's an array
      return userIds;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const isUserExists = (userId) => {
  console.log("isUserExists");
  const userRef = ref(db, `users/${userId}`);
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val().info);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const createUser = async (data) => {
  const result = await checkUsername(data.username);
  console.log(result);
  if (!result[0]) {
    // Generate a unique ID for the user based on the current date and time
    const userId = data.username + "-" +  new Date().toISOString().replace(/[:.-]/g, "");

    // Optionally, you can also add user info if it's a new user
    set(ref(db, `users/${userId}/info`), {
      name: "anonymous",
      username: data.username,
      password: data.password,
    });

    setSession({ userId: userId, username: data.username });
    return [true, userId];
  } else {
    return [false, "User already exists"];
  }
};

const createMessage = (userId, message, location) => {
  //   // Generate a reference to the messages path under the specific user
  const messagesRef = ref(db, `users/${userId}/messages`);

  // Create a new message with a unique ID under the messages path
  push(messagesRef, {
    vow: message,
    location: location,
  });
};

const readUser = async (data) => {
  console.log("Read user");

  const result = await checkUsername(data.username);

  if (result[0]) {
    

    // Optionally, you can also get the user info if it's an existing user
    const userRef = ref(db, `users/${result[1]}/info`);
   return get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());

    if(snapshot.val().password == data.password ){
      setSession({ userId: result[1], username: data.username });
      return [true,"Success"];
    } else {
      return [false,"Username or password is incorrect"];

    }



          

        } 

          // console.log("No data available");
          return [false,"Username or password is incorrect"];

        
      })
      .catch((error) => {


        console.error(error);
        return [false,"Error"];
      });



  } else {
    console.log("User does not exist");
    return [false,"Username or password is incorrect"];
  }


};

const readMessage = () => {
  console.log("Read message");
};

const updateUser = () => {
  console.log("Update user");
};

const updateMessage = () => {
  console.log("Update message");
};

const deleteUser = () => {
  console.log("Delete user");
};

const deleteMessage = () => {
  console.log("Delete message");
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

};
