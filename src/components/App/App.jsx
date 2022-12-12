import {fetchImages} from '../../services/api.jsx';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal.jsx';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);

    const renderImages = () => {
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));
          setImages(images => [...images, ...imagesArray]);
          setImagesOnPage(imagesArray.length);
          setTotalImages(totalHits);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false)
        })
    };
    renderImages();
  }, [query, page]);

  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onNextFetch = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    setShowModal(!showModal);
    setCurrentImageUrl(currentImageUrl);
    setCurrentImageDescription(currentImageDescription);
  };

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}

      <ToastContainer />
    </>
  );
}