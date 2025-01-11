import { useEffect, useState } from "react";
import DotLottieIcon from "../assets/DotLottieIcon";
import LoveAnimations from "../assets/IconSvg";
import { createMessage,  getCurrentDateTime, getCurrentLocation, getNote, isUserExists ,fetchAccurateLocation} from "../utility/Crudutil";
import useQueryParam from "./../utility/useQueryParam";
import PropTypes from "prop-types";
import Modal from "../utility/Modal";

const MessageVow = () => {
  const shareParam = useQueryParam("share");
  const shareIdParam = useQueryParam("shareid");
  const [usernameValue, setUsername] = useState(false);

  const setUserName = async () => {
    const res = await isUserExists(shareIdParam);

    if (res) {
      setUsername(true);
    } else {
      setUsername(false);
    }
  };

  setUserName();

  return (
    <div className="h-full  flex flex-col items-center justify-start w-full gap-6 ">
      <div className=" h-full w-full lg:w-1/2">
        <div className=" flex flex-col items-center justify-center w-full p-1">
          {UserCard(shareIdParam)}
        </div>

        <div className="message-wrapper  bg-violet-600 pt-12 mt-7 mx-4 pb-11 px-4 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-200 shadow-lg ">
          <div className="message-component p-1">
            {MessageInput(shareIdParam)}
          </div>
        </div>
      </div>
    </div>
  );
};
const UserCard = (shareID) => {
  const [usernameValue, setUsername] = useState("...");
  const [userNoteValue, setNote] = useState("");

  const setUserName = async () => {
    const res = await isUserExists(shareID);

    if (res) {
      const notes = await getNote(shareID);
      const username = shareID.substring(0, shareID.indexOf("-"));
      setUsername(username);

      setNote(notes);
    } else {
      setUsername("VFY USER NOT FOUND.");
    }
  };

  setUserName();

  return (
    <div className="p-0 bg-white w-full rounded-[30px] flex flex-col justify-center hover:shadow-lg  dark:bg-gray-800 dark:text-white  relative group">
      <div className="m-5  w-ful relative">
        <div className=" relative mt-0 text-left w-fu mb-0 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between ">
            <div className="">
              <h2 className="text-2xl roboto-mono-500 text-gray-800 dark:text-white">
                {usernameValue}
              </h2>
            </div>

            <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 p-0">
              {/* <LoveAnimations type="growing" size={50} /> */}
              <DotLottieIcon size="3" loop={true} pathIndex="0" />
            </div>
          </div>

          <p className="mt-0 text-sm text-gray-500 dark:text-gray-300">
            {userNoteValue}
          </p>
        </div>
      </div>
    </div>
  );
};

const MessageInput = (shareID) => {
  const [formValues, setFormValues] = useState({
    message: "",
    location: "",
    nickname: "",
    date:'',
  });
  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


useEffect(() =>{
 //getCurrentDateTime()
// console.log()
// setFormValues({...formValues,date:cDate})


// console.log(fetchAccurateLocation())


    // Fetch current location
    getCurrentLocation(
      (locationName) => setLocation(locationName),
      (errorMessage) => setLocation(errorMessage)
    );

})



  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
 
   formValues.date = getCurrentDateTime()
   formValues.location = location

   if(formValues.nickname == ''){
    formValues.nickname = 'anonymous'
   }



    console.log('Form Values:', formValues); // Log the form values
    const res = await createMessage(shareID, formValues);
    console.log(res)
    openModal()
    setFormValues({
      message: "",
      location: "",
      nickname: "",
    })
  };

  return (
    <form onSubmit={handleSubmit}>

<Modal isOpen={isModalOpen} onClose={closeModal}>
<DotLottieIcon size="15" loop={false} pathIndex="0" />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>




    <div className="bg-slate-800 border border-slate-700 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
      <h1 className="text-center text-slate-600 text-xl font-bold col-span-6">
        Send a VFY message
      </h1>

      
      <textarea
        className="bg-slate-700 text-slate-300 h-28 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
        placeholder="Your lovely message here... 
(Your vfy message can only be opened by the vfy user on February 14.)"
        name="message"
        value={formValues.message}
        onChange={handleChange}
        required

      ></textarea>
      {/* <button className="fill-slate-300 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:fill-blue-200 focus:bg-blue-600 border border-slate-600">
        <svg
          viewBox="0 0 512 512"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
        </svg>
      </button> */}
      {/* <button className="fill-slate-300 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-700 hover:border-slate-300 focus:fill-blue-200 focus:bg-blue-600 border border-slate-600">
        <svg
          viewBox="0 0 512 512"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
        </svg>
      </button> */}

      <input
        type="text"
        className=" bg-slate-700 fill-slate-300 col-span-3 flex justify-center items-center rounded-lg p-2 outline-none"
        placeholder="nickname (optional)"
        name="nickname"
        value={formValues.nickname}
        onChange={handleChange}
      />
      <span className="col-span-1"></span>

      <button className="col-span-2 stroke-slate-300 bg-slate-700 focus:stroke-blue-200 focus:bg-blue-600 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center"
      type="submit"
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M10.11 13.6501L13.69 10.0601"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      
    </div>
    </form>
  );
};

export default MessageVow;
