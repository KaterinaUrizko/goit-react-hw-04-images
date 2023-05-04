import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root');

export const Modal =({largeImage, onClose})=> {

  useEffect (()=> {
  window.addEventListener('keydown', handleKeyDown);

  return () => {window.removeEventListener('keydown', handleKeyDown)}
}); 

  const  handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
      <div className="Overlay" onClick={handleBackDropClick}>
        <div className="Modal">
          <img src={largeImage} alt="img" />
        </div>
      </div>,
      modalRoot,
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageUrl: PropTypes.string,
};