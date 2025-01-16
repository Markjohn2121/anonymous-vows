import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Front from "../Content/Front";
import Join from "../Content/Join";
import Profile from "../Content/Profile";
import Login from "../subContent/Login";
import Signup from "../subContent/Signup";
import MessageVow from "../Content/MessageVow";
import useQueryParam from "../utility/useQueryParam";
// import Signup from "../Content/Signup";

function Main() {
  // const { section } = useParams();
  const section = useQueryParam('section')
  const navigate = useNavigate();

  useEffect(() => {

    
    // List of valid sections
    const validSections = ["home", "join", "profile", "signup","login","vfymessage"];
// alert(section)
    // Redirect to "home" if the section is invalid or does not exist
    if (!section || !validSections.includes(section)) {
      navigate("/?section=profile");
    }
  }, [section,navigate]);





  
  return (
    <div className="main relative h-full " key={"main1"}>
      {section && (
        <div className=" relative h-full " style={{ padding: "0", margin: "0" }} key={"main-div1"}>
       {section === "" && <Profile key={2} />}
          {section === "home" && <Front key={2} />}
          {section === "join" && <Join />}
          {section === "profile" && <Profile />}
          {section === "signup" && <Signup />}
          {section === "login" && <Login />}
          {section === "vfymessage" && <MessageVow />}
          
        </div>
      )}
    </div>
  );
}

export default Main;
