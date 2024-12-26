import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from '../../types'


interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={styles.imageContainer}>
      {images.map((image) => (
        <li key={image.id}>
          <div>
            <ImageCard className={styles.listItems} image={image} onClick={() => onClick(image)} />
          </div>
        </li>
      ))}
    </ul>
  );
};


export default ImageGallery;
