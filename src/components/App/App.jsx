import React, { useEffect, useState } from 'react';
import { fetchImages } from '../API/Api';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { animateScroll } from 'react-scroll';
import { Modal } from '../Modal/Modal';

import './App.css'

export const App = () =>{

const [searchQuery, setSearchQuery] = useState('');
const [images, setImages] = useState([]);
const [page, setPage] = useState(1);
const per_page = 12;
const [isLoading, setIsLoading] = useState(false);
const [loadMore, setLoadMore] = useState(false);
const [error, setError] = useState(null);
const [showModal, setShowModal] = useState (false);
const [largeImageURL, setLargeImageURL] = useState('largeImageURL')
// const [id, setId] = useState(null);


useEffect(()=>{
  getImages(searchQuery, page);
}, [searchQuery, page]);


const  getImages = async (query, page) => {
     if (!query) {
      return;
    }
    setIsLoading(true);
    
    try {
      const { hits, totalHits } = await fetchImages(query, page);

      if(hits.length ===0) {
        return alert ('Sorry, nothing found. Please, try again.')
      }
    setImages(prevImages => [...prevImages, ...hits])
    setLoadMore(page < Math.ceil(totalHits / per_page))

      } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore( false);
       };

  const onloadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage+1)
    scrollOnMoreButton();
  };

 const  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
      };


    return (
      <>
        <Searchbar onSubmit={formSubmit} />

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {error && <p>Error!</p>}
        {loadMore && <Button onloadMore={onloadMore} page={page} />}

        {showModal && (
          <Modal largeImage={largeImageURL} onClose={closeModal} />
        )}
      </>
    );
  }


