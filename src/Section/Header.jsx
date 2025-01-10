import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div
        style={{
          padding: "0",
          margin: "0",
        }}
        className="text-center flex flex-col items-center justify-center "
      >
        <h1
          id="form-title"
          className="text-center text-3xl font-bold mb-2 text-gray-800  bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 shadow-lg animate-pulse text-clip-text text-transparent bg-clip-text pt-4 "
        >
          <span className=" font-bold">Welcome</span> to{" "}
          <span className=" font-semibold text-">VowForYou</span>
        </h1>
        <p className="text-center text-sm font-normal mb-9 text-white w-3/4">
          A place to receive sweet, anonymous messages of love.
        </p>
      </div>

      <div
        style={{
          padding: "0",
          margin: "0",
          backgroundColor: "ButtonFace",
          textAlign: "right",
        }}
      >
        <div
          style={{
            marginRight: "1rem",
          }}
        >
          <Link to="/me/cn/profile">
            <p
              style={{
                color: "ButtonText",
                backgroundColor: "ButtonHighlight",
                fontSize: "1.1em",
              }}
            >
              My Profile
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
