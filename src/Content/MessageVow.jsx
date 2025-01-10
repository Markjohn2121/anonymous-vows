import LoveAnimations from "../assets/IconSvg";


const MessageVow = () => {
  return (
    <div className="h-full bg-red-500 flex flex-col items-center justify-start w-full ">
      <div className="bg-green-500 h-full w-full lg:w-1/2">
        <div className="bg-blue-500 flex flex-col items-center justify-center w-full p-1">
          {UserCard()}
        </div>
        <div className="message-wrapper bg-violet-600">
          <div className="message-component">
            <h1>Message input</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageVow;



const UserCard = () => {
  return (
    <div className="p-0 bg-white w-full rounded-[30px] flex flex-col justi hover:shadow-lg  dark:bg-gray-800 dark:text-white items-start relative group">
      <div className="m-5">
        <div className="mt-0 text-left w-full mb-0 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl roboto-mono-500 text-gray-800 dark:text-white">
                mrkvldz
              </h2>
            </div>
            <div>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="50"
                height="50"
                className="heart"
              >
                <g>
                  <path
                    fill="red"
                    d="M50 82s-28-18-28-40c0-9 7-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 9 0 16 7 16 16 0 22-28 40-28 40z"
                  />
                </g>
              </svg> */}

              <LoveAnimations type="growing" size={50} />
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Laravel is a PHP framework designed for building web applications.
            It follows the MVC pattern and offers robust tools for modern web
            development.
          </p>
        </div>
      </div>
    </div>
  );
};
