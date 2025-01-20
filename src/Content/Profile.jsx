import { act, useEffect, useState } from "react";
import {
  checkDateFromInternet,
  checkSessionAndNavigate,
  clearSession,
  getCurrentDateTime,
  getMessage,
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
import useMessages from "../utility/Mesagjng";
import { toPng } from "html-to-image";
import download from "downloadjs";

function Profile() {
  const idParam = useQueryParam("id");
  const userInfo = getSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [showMessageCard, setMessageCard] = useState(false)
  const [MessageCardData, setMessageCardData] = useState('')
  const [isDateValid, setDateValid] = useState(false)
  const [allowReload, setAllowReload] = useState(false);

  const checkDate = async () => {
      
    setDateValid(await checkDateFromInternet());
  };

  useEffect(() => {

   

    if (idParam === null) {
      //    clearSession()
      checkSessionAndNavigate("profile");
    }

    // console.log(userInfo);
    if (idParam == null || idParam != userInfo.data.userId) {
      window.location.replace("/?section=profile&id=" + userInfo.data.userId);
    }



    //
    
  }, [userInfo, idParam]);
 
  //  Action LOading and Error view

  const showMessage = async (message) => {

    show({event:'loading'})
   await checkDate();
     

    if(!isDateValid){
      show({event:'error' ,message:'YOU CAN OPEN THIS MESSAGE ON or AFTER FEBRUARY 14. 😊'})
      return
    }

    const res = await getMessage(userInfo.data.userId,message)

    if(res.success){
      setMessageCardData(res.data)
      show({event:'card'})
      console.log(res)
     
    }else{
      show({event:'error' ,message:'error fetching message'})

    }
    
  };

  const show = ({ event, message = '', reload = false }) => {
    openModal();
    if (event == "loading") {
      setError(false);
      setMessageCard(false)
     
      setLoading(true);
    } else if (event == "error") {
      setLoading(false);
      setMessageCard(false)
     
      setError(true);
      setErrorMessage(message);
    } else if (event == "card") {
      setLoading(false);
      setError(false);
      setMessageCard(true)
      
    }else if (event == "stop") {
      closeModal();
      setLoading(false);
      setError(false);
      setMessageCard(false)
    
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
        ) : showMessageCard ? (
          

          <MessageCard messageData={MessageCardData} close={closeModal} />
          
        ):null}
      </Modal>

      <div className="relative  w-full lg:w-1/2 flex flex-col">
        <div className=" flex p-2">
          <ProfileCard Info={userInfo} reload={isReload} action={show} />
        </div>

        <div className=" relative  flex-grow px-2">
          {userInfo.exists && (
            <Messages Info={userInfo} reload={isReload} action={showMessage} />
          )}
        </div>
      </div>
    </div>
  );
}

const ProfileCard = ({ Info, reload, action }) => {
  const [usernameValue, setUsername] = useState("...");
  const [userNoteValue, setNote] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipMsg, setShowTooltipMsg] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/?section=vfymessage&shareid=${Info.data.userId}`)
      .then(() => {
       setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
        setShowTooltipMsg('Profile Link Copied!')
      })
      .catch((error) => {
        console.error('Failed to copy the link:', error);
      });
  };
  
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
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
        setShowTooltipMsg('Profile Note Updated!')
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
          <img
            src="/icon/icon_144.png"
            alt=""
            className="bg-purple-200 w-24 h-24 shrink-0 rounded-xl"
          />
          <div className="mt-3">
            <button className="hover:bg-purple-300 bg-neutral-50 font-bold text-indigo-500 rounded text-wrap  px-4 text-base "
            onClick={handleCopyLink}
            >
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
          <div className=" flex justify-between items-center text-right">
            <div className="flex justify-center  flex-1 px-1">
              
              <div className={ showTooltip ? "bg-green-400 w-max text-black px-2 rounded-lg  flex items-center justify-center opacity-0 scale-0 animate-appearToolTipF" : "bg-green-400 w-max text-black px-2 rounded-lg  flex items-center justify-center opacity-0 scale-0 animate-appearToolTipB"}>
                <p className="text-sm">{showTooltipMsg}</p>
              </div>
            
            </div>
          <div>
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
    </div>
  );
};

const Messages = ({ Info, reload, action }) => {
  // const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);

  const { messages, error } = useMessages(Info.data.userId);
  // console.log()

  // setMessageCount(messages.length)
  useEffect(() => {
    // const fetchMessages = async () => {
    //     const result = await getAllMessageIds(Info.data.userId)
    //     if (result.success) {
    //       setMessages(result.messages);
    //       setMessageCount(result.messages.length)
    //     } else {
    //       setError(result.message);
    //     }
    //   };
    //   fetchMessages();
  }, [reload]);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex flex-col overflow-hidden items-baseline text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow  px-4 py-2 w-fit whitespace-pre md:flex group relative  justify-center gap-2 rounded-md transition-all duration-300 ease-out  hover:ring-black mt-3">
        <div className="flex items-center ">
          {/* ICON HERE */}

          <div className=" flex items-center gap-1 text-sm md:flex">
            ❤️
            <span className="inl tabular-nums tracking-wider font-display font-normal text-white bg-red-600 rounded-md p-1">
              {messages.length}
            </span>
            <span className=" text-white">Messages</span>
          </div>
        </div>
      </div>

      <div className="relative  flex-grow   rounded-lg ">
        <div className="relative flex-grow mt-1 py-4  rounded-lg">
          <div className=" h-80 overflow-y-auto  rounded-lg flex gap-2 flex-wrap justify-center  px-1">
            {messages.map((message) => (
              <MessagesList
                key={message.id}
                messageData={message}
                showmessage={action}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagesList = ({ messageData, showmessage }) => {
  let date = messageData.date ? messageData.date.slice(0, 10) : false;

  const isDateMatch = date == getCurrentDateTime("date");
  // console.log(isDateMatch)

  const showMsg = () => {
    alert(date == getCurrentDateTime("date"));
  };

  const message = () => {
    showmessage(messageData.id);
  };
  return (
    <>
      <div
        className="group relative cursor-pointer w-full sm:w-full md:w-full lg:w-auto"
        onClick={message}
      >
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/10">
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

          <div className="relative p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-30 blur-sm transition-opacity duration-300 group-hover:opacity-40"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900">
                💌
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-sm user-select: none pointer-events-none">
                 <span className="font-light text-sm ml-1 mr-1">from :  </span>   {messageData.nickname} <span className="font-light">Vow</span> 💝
                  </h3>
                  <p className="text-sm text-slate-400"></p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[0.4em] text-slate-400 -mt-2">
                  {messageData.date && (
                    messageData.date
                  )}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                  {isDateMatch ? "New" : " "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// MESSAGE CARD

const MessageCard = ({messageData,close}) => {

  const handleShare = () => {
    const node = document.getElementById('message-card');
  
    toPng(node)
      .then((dataUrl) => {
        // Create a temporary link to open the image in a new tab
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'vfy-message-card.png';
        link.click();
  
        // Open Facebook share dialog with the generated image URL
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dataUrl)}`;
        window.open(shareUrl, '_blank');
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };
  

  const handleDownload = () => {
    const node = document.getElementById('message-card');
  
    toPng(node)
      .then((dataUrl) => {
        // download(dataUrl, `VfySahare/vfy-message-card-${messageData.date}.png`);
        triggerDownload(dataUrl)
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };
  const triggerDownload = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `vfy-message-card-${messageData.date}.png`; // You can set a custom filename
    link.click(); // Trigger the download
  };
  

  return (


    <div className="relative w-full ">
       <div id="message-card" className="w-full bg-gradient-to-r from-pink-500 from-10% via-sky-700 via-30% to-pink-500 to-90% bg-[length:400%] rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3  hover:shadow-2xl hover:shadow-pink-300 transition-shadow opacity-0 animate-appearEnvelope">

        <h2 className="text-black">Vow For You💖</h2>

       <div className=" flex flex-col justify-center items-center w-full min-h-48 h-auto bg-zinc-300 rounded-2xl text-black p-4 relative">
        <div className="text-left items-start  w-full">
          <p className="text-base">Dear {getSession().data.username},</p>
        </div>
        <div className="w-full">
        <p className=" text-base justify-start text-left" style={{textIndent:'1rem',fontFamily:'Dancing Script cursive'}}>{messageData.vow}</p>

        </div>
        <div className="mt-5">
          <p className="">-VFY-</p>
        </div>
       
</div>


      <div className="text-white bg-neutral-800 w-full p-4 rounded-lg">
        <p className="text-sm font-light -mb-1">from:</p>
        <p className="font-extrabold text-base ml-3">{messageData.nickname}</p>
        <p className="text-sm font-light -mb-1 mt-2">Approximate address:</p>
        <p className="font-extrabold text-base font-thin ml-3">{messageData.location}</p>
      </div>
     
    </div>


{/* share button */}
<button className="bg-sky-700  text-sm font-light px-2 py-1 rounded-xl hover:bg-sky-500 transition-colors mt-3 opacity-0 animate-appearEnvelope"
onClick={handleDownload}
>
       Download and share
      </button>

    {/* Close Modal button */}

    <div className=" flex justify-center mt-9 ">
          <button
            className="cursor-pointer text-white font-normal relative rounded-full px-4 py-3 border border-white opacity-0 animate-appear"
          onClick={close}
          >
            X
          </button>
        </div>

    </div>
   

  );
};



ProfileCard.propTypes = {
  Info: PropTypes.object.isRequired,
  reload: PropTypes.bool,
  action: PropTypes.func,
};

MessagesList.propTypes = {
  messageData: PropTypes.object.isRequired,
  showmessage: PropTypes.func,
};

Messages.propTypes = {
  Info: PropTypes.object.isRequired,
  reload: PropTypes.bool,
  action: PropTypes.func,
};

MessageCard.propTypes = {
  messageData: PropTypes.object.isRequired,
  close: PropTypes.func,
 
};


export default Profile;
