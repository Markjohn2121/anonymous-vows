import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PropTypes from 'prop-types';

const DotLottieIcon = ({size,pathIndex}) => {

const path = ["https://lottie.host/7a804753-cb79-4c10-a415-d86910f4750d/OSD8jvY8Zq.lottie",

];


  return (
    <DotLottieReact
      
      style={{
        width:size+"rem",
        height: size+"rem",
        position: "relative",
        padding: "-10em",
      }}
      src={path[pathIndex]}
      loop
      autoplay
      
    />
  );
};

DotLottieIcon.propTypes = {
  size: PropTypes.string.isRequired,
  pathIndex: PropTypes.string.isRequired,
};


export default DotLottieIcon;
