import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const  ImageGalleryItem = ({ description, smallImage, largeImage, openModal }) => {
  return (
    <li className={css.item} onClick={openModal} >
      <img src={smallImage} alt={description} data-large={largeImage}/>
    </li>
  );
}

ImageGalleryItem.prototype = {
  description: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

