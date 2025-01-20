import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearSession, getSession } from "../utility/Crudutil";
import useQueryParam from "../utility/useQueryParam";
import DownloadButton from "../utility/DownloadButton";

function Header() {


  const param = useQueryParam("section");

  return (
    <>
      <div
        style={{
          padding: "0",
          margin: "0",
        }}
        className="text-center flex flex-col items-center justify-center "
      >
        <h1
          id="form-title"
          className="text-center text-3xl font-bold mb-2 text-gray-800  bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 shadow-lg animate-pulse text-clip-text text-transparent bg-clip-text pt-4 "
        >
          <span className=" font-bold">Welcome</span> to{" "}
          <span className=" font-semibold text-">VowForYou</span>
        </h1>
        <p className="text-center text-sm font-normal mb-9 text-white w-3/4">
          A place to receive sweet, anonymous messages of love.
        </p>
      </div>

      <div
        style={{
          padding: "0",
          margin: "0",
          backgroundColor: "transparent",
          textAlign: "right",
        }}
      >
        <div>

          
          <div
            className={
              param == 'home' || param == 'signup'
                ? "hidden"
                : " -mt-5 flex flex-row items-center justify-end pr-3 mb-5"
            }
          >
              <div>
              <DownloadButton/>
           </div>
           
            {getSession().exists ? (
              <>
              
              {param == 'profile' ? (
                
                  <button className=" py-1 px-4 bg-blue-50 rounded-md ml-16 text-black"
                  onClick={()=>{
                   if(clearSession()) window.location.replace("/?section=login");
                  }}
                  >
                    Logout
                  </button>
                
              ): (
                <Link to="/?section=profile">
                  <p className=" py-1 px-4 bg-blue-50 rounded-md ml-16 text-black">
                    My Profile
                  </p>
                </Link>
              )
              }
                
              </>
            ) : (
              <Link to="/?section=home">
                <p className=" py-1 px-4 bg-blue-50 rounded-md ml-16 text-black">
                  JOIN NOW {}
                </p>
              </Link>
            )}

          
             
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Header;
