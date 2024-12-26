import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";


type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
};


type ErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};


const App: React.FC = () => {
  
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  
  const ACCESS_KEY: string = "uGQS65bV6EsW8e6gyzJWK7vqsDZyXR0M7NNtqV2Mzuk";

  
  const resetState = useCallback(() => {
    setPage(1);
    setImages([]);
    setError(null);
  }, []);

  
  const handleSearchSubmit = (searchQuery: string): void => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid search query.");
      return;
    }
    setQuery(searchQuery);
    resetState();
  };

  
  const fetchImages = useCallback(async (): Promise<void> => {
    if (!query) return;

    setIsLoading(true);
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });
      const fetchedImages: Image[] = response.data.results;

      if (fetchedImages.length === 0 && page === 1) {
        setError("No images found. Try a different query.");
      } else {
        setImages((prev) => (page === 1 ? fetchedImages : [...prev, ...fetchedImages]));
      }
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error?.response?.data?.message || "Error loading images");
    } finally {
      setIsLoading(false);
    }
  }, [query, page, ACCESS_KEY]);

  
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  
  const openModal = (imageUrl: string): void => {
    if (!isModalOpen) {
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onClick={openModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !error && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} isLoading={isLoading} />
      )}
      {isModalOpen && selectedImage && (
        <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      )}
    </div>
  );
};


export default App;
