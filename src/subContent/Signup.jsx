import { useState } from "react";
import { createUser } from "../utility/Crudutil";

import { useNavigate } from "react-router-dom";

function Signup() {
  // State to store form values
const [errorValue, setErrorValue] = useState([true,'']);
const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmpassword: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    //console.log('Form Values:', formValues); // Log the form values

    if (formValues.password !== formValues.confirmpassword) {
        // alert("Passwords do not match");
        setErrorValue([false,"Passwords do not match"]);
        
        
        return;
        }

   const result = await createUser(formValues); // Create a new user
   setErrorValue(result);

   if(result[0]){
    navigate("/?section=profile&id="+result[1]);
   }

 
  };

  return (
    <div className="h-full flex items-center justify-center   w-full ">
      <div className="relative ">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>

        <h1
          id="form-title"
          className="text-center text-3xl font-bold mb-2 text-gray-800  bg-gradient-to-r from-black via-red-800 to-yellow-800 shadow-lg animate-pulse text-clip-text text-transparent bg-clip-text pt-4 "
        >
          <span className=" font-semibold text-">VowForYou</span>
        </h1>

        <div
          id="form-container"
          className="bg-white p-8 rounded-lg shadow-lg w-80 relative z-10 transform transition duration-500 ease-in-out bg-gradient-to-r from-purple-q00 via-pink-300 to-red-100  animate-pulse"
        >



          <form className="space-y-6 " onSubmit={handleSubmit}>
<div>
    {!errorValue[0] && <p className={!errorValue[0]?' text-white text-sm w-full text-center bg-red-800 p-1' : ''} > {errorValue[1]}</p>}

</div>

          
            <input
              className="w-full h-10 border border-gray-100 px-3 rounded-lg"
              placeholder="Username"
              type="text"
              name="username"
              value={formValues.username}
              onChange={(e)=> { handleChange(e) ; setErrorValue([true,''])}} 
             
              required
            />
            <input
              className="w-full h-10 border border-gray-800 px-3 rounded-lg"
              placeholder="Password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={(e)=> { handleChange(e) ; setErrorValue([true,''])}} 
              required
            />

            <input
              className="w-full h-10 border border-gray-800 px-3 rounded-lg"
              placeholder="Confirm Password"
              type="text"
              name="confirmpassword"
              value={formValues.confirmpassword}
              onChange={(e)=> { handleChange(e) ; setErrorValue([true,''])}} 
              required
            />

            <div>{SignupButton()}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

const SignupButton = () => {
  return (
    <button className="group relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"></span>

      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-1 py-1 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-950/90">
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>

        <span className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold">
          Create
        </span>

        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </span>
    </button>
  );
};
