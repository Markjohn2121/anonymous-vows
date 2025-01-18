import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-[3px]">
      <div className=" rounded-lg shadow-lg p-8 w-full  lg:w-1/2 flex items-center justify-center">
      <div>
      {children}
      </div>
  
       

  
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;

