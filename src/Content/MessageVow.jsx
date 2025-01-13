import { useEffect, useState } from "react";
import DotLottieIcon from "../assets/DotLottieIcon";
import PropTypes from "prop-types";
import {
  createMessage,
  getCurrentDateTime,
  getCurrentLocation,
  getNote,
  isUserExists,
} from "../utility/Crudutil";
import useQueryParam from "./../utility/useQueryParam";
import Modal from "../utility/Modal";
import ErrorView from "../assets/ErrorView";
import Loader from "../assets/Loader";

const MessageVow = () => {
  const shareIdParam = useQueryParam("shareid");

  return (
    <div className="h-full flex flex-col items-center justify-start w-full gap-6">
      <div className="h-full w-full lg:w-1/2">
        <div className="flex flex-col items-center justify-center w-full p-1">
          <UserCard shareID={shareIdParam} />
        </div>

        <div className="message-wrapper bg-violet-600 pt-12 mt-7 mx-4 pb-11 px-4 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-200 shadow-lg">
          <div className="message-component p-1">
            <MessageInput shareID={shareIdParam} />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ shareID }) => {
  const [usernameValue, setUsername] = useState("...");
  const [userNoteValue, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isReload,setReload] = useState(false)

  useEffect(() => {
    setReload(false)
    openModal()
    setLoading(true)
    const fetchUserData = async () => {
      const res = await isUserExists(shareID);

      if (!res.err) {
        closeModal()
        if (res.user) {
          const notes = await getNote(shareID);
          const username = shareID.substring(0, shareID.indexOf("-"));
          setUsername(username);
          setNote(notes);
          setLoading(false)
          setError(false)
         
        } else {
          
          setUsername("vfy user not found");
          setError(false)
          setLoading(false)
        }
      } else {
        setLoading(false)
        setUsername(res.message);
        setError(true)
      }
    };

    fetchUserData();

  }, [shareID,isReload]);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const reload =()=> {
    setReload(true)
    // alert('dsds')
  };

  return (
    <div className="p-0 bg-white w-full rounded-[30px] flex flex-col justify-center hover:shadow-lg dark:bg-gray-800 dark:text-white relative group">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorView err={usernameValue} closeModal={closeModal} reload={reload} />
        ) : null}

      </Modal>

      <div className="m-5 relative">
        <div className="relative mt-0 text-left w-full mb-0 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl roboto-mono-500 text-gray-800 dark:text-white">
              {usernameValue}
            </h2>
            <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 p-0">
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

const MessageInput = ({ shareID }) => {
  const [formValues, setFormValues] = useState({
    message: "",
    location: "",
    nickname: "",
    date: "",
  });

  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getCurrentLocation(
      (locationName) => setLocation(locationName),
      (errorMessage) => setLocation(errorMessage)
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setSubmit(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    setLoading(true);

    formValues.date = getCurrentDateTime();
    formValues.location = location;
    if (formValues.nickname === "") formValues.nickname = "anonymous";

    const res = await createMessage(shareID, formValues);

    if (res.success) {
      setLoading(false);
      setSubmit(true);
      setMsg(formValues.message);
      setFormValues({ message: "", location: "", nickname: "" });
    } else {
      setLoading(false);
      setSubmit(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <form onSubmit={handleSubmit}>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <Loader />
        ) : isSubmit ? (
          
          <Envelope
            msg={msg}
            username={shareID.substring(0, shareID.indexOf("-"))}
            closeModal={closeModal}
          />
        ) : (
          <ErrorView err={"Something went wrong"} closeModal={closeModal} />
        )}
      </Modal>
      <div className="bg-slate-800 border border-slate-700 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
        <h1 className="text-center text-slate-600 text-xl font-bold col-span-6">
          Send a VFY message
        </h1>
        <textarea
          className="bg-slate-700 text-slate-300 h-28 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
          placeholder="Your lovely message here... \n(Your vfy message can only be opened by the vfy user on February 14.)"
          name="message"
          value={formValues.message}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          className="bg-slate-700 fill-slate-300 col-span-3 flex justify-center items-center rounded-lg p-2 outline-none"
          placeholder="nickname (optional)"
          name="nickname"
          value={formValues.nickname}
          onChange={handleChange}
        />
        <span className="col-span-1"></span>
        <button
          className="col-span-2 stroke-slate-300 bg-slate-700 focus:stroke-blue-200 focus:bg-blue-600 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center"
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

const Envelope = ({ msg, username, closeModal }) => {
  return (
    <>
      <div className="card opacity-0 animate-appearEnvelope">
        <div className=" flex justify-center mb-4">
          <p className="text-black text-sm font-bold  bg-green-300 px-6 py-1 rounded-md opacity-0 animate-appear">
            Your vfy message is delivered
          </p>
        </div>

        <div className="relative bg-black w-[300px] sm:w-[350px] aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center py-2 justify-start transform  opacity-100 bg-zinc-100 w-full h-full absolute -translate-y-16 animate-slideIn ">
            <div className=" text-left flex justify-start items-start w-full px-1">
              <p className="text-lg sm:text-1xl font-semibold text-gray-500 font-serif">
                Dear {username},
              </p>
            </div>

            <p className="px-10 text-[10px] sm:text-[12px] text-gray-700">
              {msg}
            </p>
          </div>

          <div className="z-20 opacity-0 animate-appear">
            <DotLottieIcon size="10" loop={true} pathIndex="0" />
          </div>

          <div className="tp border bg-neutral-800 absolute animate-clipExpand  w-full h-full [clip-path:polygon(50%_0%,_100%_0,_0_0)] bg-gradient-to-r from-slate-700-100 via-slate-900-500 to-blue-800"></div>
          <div className="lft bg-gradient-to-br from-purple-700-100 via-gray-900-500 to-gray-200 absolute w-full h-full  [clip-path:polygon(50%_50%,_0_0,_0_100%)]  "></div>
          <div className="rgt bg-gradient-to-l from-purple-700-100 via-slate-900-500 to-red-200 absolute w-full h-full [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"></div>
          <div className="btm bg-gradient-to-br from-purple-700-100 via-gray-100-500 to-red-200 absolute w-full h-full [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"></div>
        </div>

        <div className=" flex justify-center mt-9">
          <button
            className="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 opacity-0 animate-appear"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  shareID: PropTypes.string.isRequired,
};

MessageInput.propTypes = {
  shareID: PropTypes.string.isRequired,
};

Envelope.propTypes = {
  msg: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default MessageVow;
