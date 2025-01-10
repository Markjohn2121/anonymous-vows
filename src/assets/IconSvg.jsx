
import PropTypes from "prop-types";



// <LoveAnimations type="beating" size={100} />
// <LoveAnimations type="floating" size={75} />
// <LoveAnimations type="spinning" size={125} />
// <LoveAnimations type="intertwined" size={150} />
// <LoveAnimations type="growing" size={50} />


const LoveAnimations = ({ type = "beating", size = 100 }) => {
  const keyframes = `
    @keyframes beat {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-50px);
        opacity: 0;
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes twist {
      0%, 100% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(-15deg);
      }
    }

    @keyframes grow {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
    }
  `;

  const styles = {
    beating: {
      animation: "beat 1s infinite",
      transformOrigin: "center",
    },
    floating: {
      animation: "float 2s infinite ease-in-out",
    },
    spinning: {
      animation: "spin 2s infinite linear",
    },
    intertwined: {
      animation: "twist 2s infinite ease-in-out",
    },
    growing: {
      animation: "grow 1.5s infinite ease-in-out",
      transformOrigin: "center",
    },
  };

  const renderSVG = () => {
    switch (type) {
      case "beating":
        return (
          <path
            fill="red"
            d="M50 82s-28-18-28-40c0-9 7-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 9 0 16 7 16 16 0 22-28 40-28 40z"
          />
        );
      case "floating":
        return (
          <path
            fill="pink"
            d="M50 82s-28-18-28-40c0-9 7-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 9 0 16 7 16 16 0 22-28 40-28 40z"
          />
        );
      case "spinning":
        return (
          <path
            fill="purple"
            d="M50 82s-28-18-28-40c0-9 7-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 9 0 16 7 16 16 0 22-28 40-28 40z"
          />
        );
      case "intertwined":
        return (
          <g fill="none" stroke="red" strokeWidth="5">
            <path d="M50 50c-20 0-20-20-20-20s0-20 20-20 20 10 20 20-20 20-20 20z" />
            <path d="M150 50c-20 0-20-20-20-20s0-20 20-20 20 10 20 20-20 20-20 20z" />
          </g>
        );
      case "growing":
        return (
          <path
            fill="red"
            d="M50 82s-28-18-28-40c0-9 7-16 16-16 6 0 10 4 12 8 2-4 6-8 12-8 9 0 16 7 16 16 0 22-28 40-28 40z"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{keyframes}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        width={size}
        height={size}
        style={styles[type]}
      >
        {renderSVG()}
      </svg>
    </>
  );
};
LoveAnimations.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
};

export default LoveAnimations;

