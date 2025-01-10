// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { db } from "../firebase";
// import { ref, set, push } from "firebase/database";


import UseQueryParam from "../utility/useQueryParam";




function Front() {

  // const { section } = useParams(); // Get 'section' from route parameters
  const id = UseQueryParam("id");

  console.log("id", id);



  return (
    <div className=" relative h-full  ">
      {/* <h1>Front</h1> */}

      {/* { credit == 'login' ? <Login/> : <Signup/>}  */}

      {/* {credit === "login" ? <Login /> : credit === "signup" ? <Signup /> : null} */}
    </div>
  );
}
// Front.propTypes = {
//   credit: PropTypes.bool.isRequired,
// };

export default Front;
