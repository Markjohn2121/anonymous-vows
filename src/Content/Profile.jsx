import { act, useEffect, useState } from "react";
import {
  checkSessionAndNavigate,
  clearSession,
  getNote,
  getSession,
  isUserExists,
  updateUserNote,
} from "../utility/Crudutil";
import useQueryParam from "../utility/useQueryParam";
import Modal from "../utility/Modal";
import Loader from "../assets/Loader";
import ErrorView from "../assets/ErrorView";
import PropTypes from "prop-types";

function Profile() {
  const idParam = useQueryParam("id");
  const userInfo = getSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [allowReload, setAllowReload] = useState(false);

  useEffect(() => {
    //    clearSession()
    checkSessionAndNavigate("profile");
    const userInfo = getSession();
    console.log(userInfo);
    if (idParam == null || idParam != userInfo.data.userId) {
      window.location.replace("/?section=profile&id=" + userInfo.data.userId);
    }

    //
  }, []);

  //  Action LOading and Error view

  const show = ({ event, message, reload = false }) => {
    if (event == "loading") {
      setError(false);
      openModal();
      setLoading(true);
    } else if (event == "error") {
      setLoading(false);
      openModal();
      setError(true);
      setErrorMessage(message);
    } else if (event == "stop") {
      setLoading(false);
      setError(false);
      closeModal();
    }

    setAllowReload(reload);
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const startReload = () => {
    if (allowReload) {
      setIsReload(!isReload);
    }
  };

  return (
    <div className="h-full  flex flex-row justify-center w-full  ">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorView
            err={errorMessage}
            closeModal={closeModal}
            reload={startReload}
          />
        ) : null}
      </Modal>

      <div className="relative  w-full lg:w-1/2 flex flex-col">
        <div className=" flex p-2">
          <ProfileCard Info={userInfo} reload={isReload} action={show} />
        </div>

        <div className=" relative  flex-grow px-2">
          <Messages Info={userInfo} />
        </div>
      </div>
    </div>
  );
}

const ProfileCard = ({ Info, reload, action }) => {
  const [usernameValue, setUsername] = useState("...");
  const [userNoteValue, setNote] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(value);
  };

  const updateNote = async () => {
    action({ event: "loading", message: "", reload: false });

    const res = await updateUserNote(Info.data.userId, userNoteValue);

    if (!res.err) {
      if (res.success) {
        action({ event: "stop", message: "", reload: false });
      } else {
        action({ event: "error", message: res.message, reload: false });
      }
    } else {
      action({ event: "error", message: res.message, reload: false });
    }
  };

  useEffect(() => {
    console.log(Info);
    action({ event: "loading", message: "", reload: false });

    const fetchUserData = async () => {
      const res = await isUserExists(Info.data.userId);

      if (!res.err) {
        if (res.user) {
          const notes = await getNote(Info.data.userId);
          const username = Info.data.username; //userInfo.data.userId.substring(0, userInfo.data.userId.indexOf("-"));
          setUsername(username);
          setNote(notes);
          action({ event: "stop", message: "", reload: false });
        } else {
          setUsername("VFY PROFILE LINK NOT FOUND!");
          action({ event: "error", message: userNoteValue, reload: false });
        }
      } else {
        setUsername(res.message);
        action({ event: "error", message: "Request Timeout!", reload: true });
      }
    };

    fetchUserData();
  }, [reload]);

  return (
    <div className="w-full h-fit flex flex-col justify-center gap-2  bg-white dark:bg-gray-800 rounded-lg shadow p-2">
      <div className="flex gap-0">
        <div>
          <img alt="" className="bg-purple-200 w-24 h-24 shrink-0 rounded-lg" />
          <div className="mt-3">
            <button className="hover:bg-purple-300 bg-neutral-50 font-bold text-indigo-500 rounded text-nowrap  px-4">
              Share
            </button>
          </div>
        </div>

        <div className="flex flex-col text-white w-full">
          <span className="font-bold italic ml-2">{usernameValue}</span>
          <textarea
            className="bg-slate-700 text-slate-300 h-16 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-1 resize-none outline-none rounded-lg p-1 duration-300 focus:border-slate-300 text-sm text-wrap mt-2 mb-2 ml-2"
            placeholder="Add note... "
            name="message"
            value={userNoteValue}
            onChange={handleChange}
            maxLength={155}
          ></textarea>
          <div className=" text-right">
            <button
              className="-mt-20 hover:bg-purple-300 bg-neutral-50 font-bold text-indigo-500 rounded text-sm p-1"
              onClick={updateNote}
            >
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



const Messages = ({ Info, reload, action }) => {
  return (
    <div className="flex flex-col justify-center  h-full">
      <div className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow  px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out  hover:ring-black ">
        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
        <div className="flex items-center">
    
{/* ICON HERE */}

          <span className="ml-1 text-white">Messages</span>
        </div>
        <div className="ml-2 flex items-center gap-1 text-sm md:flex">
          <svg
            className="w-4 h-4 text-red-500 transition-all duration-300 "
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="inline-block tabular-nums tracking-wider font-display font-medium text-white">
            6
          </span>
        </div>
      </div>

      <div className="relative bg-black flex-grow mt-1">
        <h1>mess</h1>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  Info: PropTypes.object.isRequired,
  reload: PropTypes.bool,
  action: PropTypes.func,
};







Messages.propTypes = {
  Info: PropTypes.object.isRequired,
  reload: PropTypes.bool,
  action: PropTypes.func,
};

export default Profile;
