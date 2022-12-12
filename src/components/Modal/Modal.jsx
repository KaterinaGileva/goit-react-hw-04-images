import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, currentImageUrl, currentImageDescription }) {
  useEffect(() => {
    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
    window.addEventListener('keydown', handleKeyDown);
  
  return () => {window.removeEventListener('keydown', handleKeyDown)};
}, [onClose]
  )

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

 

    return createPortal(
      <div className={css.backdrop} onClick={handleClickBackdrop}>
        <div className={css.modal}>
          
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }


Modal.prototype = {
 
  onClose: PropTypes.func.isRequired,
  currentImageUrl: PropTypes.string,
  currentImageDescription: PropTypes.string.isRequired,
};