import PropTypes from "prop-types";

const ErrorView = ({ err, closeModal, reload }) => {
  return (
    <div className=" border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex justify-center items-center flex-col  backdrop-blur-[60px]">
      <div>
        <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
          <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
            <div className="flex gap-2">
              <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-white">Please try again</p>
                <p className="text-gray-500">{err}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="mt-3 h-fit w-fit px-[1em] py-0   border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
          onClick={() => {
            closeModal();
            reload();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

ErrorView.propTypes = {
  err: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  reload: PropTypes.func,
};

export default ErrorView;
