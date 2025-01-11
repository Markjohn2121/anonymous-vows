import {  useEffect } from "react";
import { checkSessionAndNavigate, getSession } from "../utility/Crudutil";
import useQueryParam from "../utility/useQueryParam";

function    Profile() {



useEffect(() => {
   

//
});
checkSessionAndNavigate("profile");

const idParam  =  useQueryParam("id")
const userInfo =getSession();
if(idParam == null || idParam != userInfo.data.userId){


    window.location.replace('/?section=profile&id='+ userInfo.data.userId);
}



    return (
        <div className="h-full ">
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;