import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";


interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}


interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}


interface AppState {
  query: string;
  images: UnsplashImage[];
  page: number;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedImage: UnsplashImage | null;
}


const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    query: "",
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isModalOpen: false,
    selectedImage: null,
  });


  const ACCESS_KEY = "uGQS65bV6EsW8e6gyzJWK7vqsDZyXR0M7NNtqV2Mzuk";


  const resetState = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      page: 1,
      images: [],
      error: null,
    }));
  }, []);


  const handleSearchSubmit = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setState((prevState) => ({ ...prevState, error: "Please enter a valid search query." }));
      return;
    }
    setState((prevState) => ({ ...prevState, query: searchQuery }));
    resetState();
  };


  const fetchImages = useCallback(async () => {
    if (!state.query) return;

    setState((prevState) => ({ ...prevState, isLoading: true }));

    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query: state.query, page: state.page, per_page: 12 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      }) as AxiosResponse<{ results: UnsplashImage[] }>;
      
      
      const fetchedImages: UnsplashImage[] = response.data.results;


      if (fetchedImages.length === 0 && state.page === 1) {
        setState((prevState) => ({
          ...prevState,
          error: "No images found. Try a different query.",
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          images: state.page === 1 ? fetchedImages : [...prevState.images, ...fetchedImages],
        }));
      }
    } catch (err) {
      const error = err as ErrorResponse;
      setState((prevState) => ({
        ...prevState,
        error: error?.response?.data?.message || "Error loading images",
      }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [state.query, state.page, ACCESS_KEY]);


  useEffect(() => {
    fetchImages();
  }, [fetchImages]);


  const openModal = (image: UnsplashImage) => {
    if (!state.isModalOpen) {
      setState((prevState) => ({
        ...prevState,
        selectedImage: image,
        isModalOpen: true,
      }));
    }
  };
  
  const closeModal = () => {
    setState((prevState) => ({
      ...prevState,
      selectedImage: null,
      isModalOpen: false,
    }));
  };


  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {state.error && <ErrorMessage message={state.error} />}
      {state.images.length > 0 && <ImageGallery images={state.images} onClick={openModal} />}
      {state.isLoading && <Loader />}
      {state.images.length > 0 && !state.isLoading && !state.error && (
        <LoadMoreBtn onClick={() => setState((prevState) => ({ ...prevState, page: prevState.page + 1 }))} isLoading={state.isLoading} />
      )}
      {state.isModalOpen && state.selectedImage && (
        <ImageModal isOpen={state.isModalOpen} onClose={closeModal} image={state.selectedImage} />
      )}
    </div>
  );
};


export default App;
