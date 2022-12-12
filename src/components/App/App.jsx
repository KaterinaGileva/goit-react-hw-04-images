import { Component } from 'react';
import {fetchImages} from '../../services/api.jsx';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal.jsx';
import { Loader } from 'components/Loader/Loader.jsx';
import { Button } from 'components/Button/Button.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    imagesOnPage: 0,
    isLoading: false,
    showModal: false,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, this.state.page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));
          
          return this.setState(({ images, imagesOnPage }) => ({
            images: [...images, ...imagesArray],
            imagesOnPage: imagesOnPage + imagesArray.length,
            totalImages: totalHits,
            isLoading: false,
          }));
        })
        .catch(error => this.setState({ error }))
         .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: false }))
        );
    }
  }

  getSearchRequest = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const getSearchRequest = this.getSearchRequest;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

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
}


      