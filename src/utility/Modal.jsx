import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
      <div className="bg-gradient-to-r from-slate-700-100 via-slate-900-500 to-gray-200 shadow-lg rounded-lg shadow-lg p-8 w-1/3 flex items-center justify-center">
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

