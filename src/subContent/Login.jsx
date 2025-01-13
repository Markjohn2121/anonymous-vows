import { useEffect, useState } from "react";
import { checkSessionAndNavigate, readUser } from "../utility/Crudutil";
import Modal from "../utility/Modal";
import ErrorView from "../assets/ErrorView";
import Loader from "../assets/Loader";

function Login() {
  const [state, setState] = useState({
    errorValue: [true, ""],
    formValues: { username: "", password: "" },
    isModalOpen: false,
    isLoading: false,
    isError: false,
  });

  const { errorValue, formValues, isModalOpen, isLoading, isError } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      formValues: { ...prevState.formValues, [name]: value },
      errorValue: [true, ""],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    openModal();
    setLoading(true);
    const res = await readUser(formValues);
    console.log(formValues);
    if (!res.err) {
      closeModal();
    } else {
      setState((prevState) => ({ ...prevState, isError: true }));
    }
    setState((prevState) => ({
      ...prevState,
      errorValue: res,
      isLoading: false,
    }));
  };

  useEffect(() => {
    checkSessionAndNavigate("login");
  }, []);

  const closeModal = () =>
    setState((prevState) => ({ ...prevState, isModalOpen: false }));
  const openModal = () =>
    setState((prevState) => ({ ...prevState, isModalOpen: true }));
  const setLoading = (loading) =>
    setState((prevState) => ({ ...prevState, isLoading: loading }));

  const loginButton = () => (
    <button className="group relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"></span>
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-1 py-1 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-950/90">
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <span className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-semibold">
          Let&apos;s Go
        </span>
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </span>
    </button>
  );

  return (
    <div className="h-full flex items-center justify-center w-full">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorView err="something went wrong" closeModal={closeModal} />
        ) : null}
      </Modal>
      <div className="relative">
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
        <h1
          id="form-title"
          className="text-center text-3xl font-bold mb-2 text-gray-800 bg-gradient-to-r from-black via-red-800 to-yellow-800 shadow-lg animate-pulse text-clip-text text-transparent bg-clip-text pt-4"
        >
          <span className="font-semibold text-">VowForYou</span>
        </h1>
        <div
          id="form-container"
          className="bg-white p-8 rounded-lg shadow-lg w-80 relative z-10 transform transition duration-500 ease-in-out bg-gradient-to-r from-purple-q00 via-pink-300 to-red-100 animate-pulse"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {!errorValue.isExist && (
                <p
                  className={
                    !errorValue[0]
                      ? "text-white text-sm w-full text-center bg-red-800 p-1"
                      : ""
                  }
                >
                  {errorValue.message}
                </p>
              )}
            </div>
            <input
              className="w-full h-10 border border-gray-100 px-3 rounded-lg"
              placeholder="Username"
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
            <input
              className="w-full h-10 border border-gray-800 px-3 rounded-lg"
              placeholder="Password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <div>{loginButton()}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
