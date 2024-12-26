import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";


interface Image {
  id: string | number;
  [key: string]: any;
}

interface ImageGalleryProps {
  images: Image[];
  onClick: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={styles.imageContainer}>
      {images.map((image) => (
        <li key={image.id}>
          <div>
            <ImageCard
              className={styles.listItems}
              image={image}
              onClick={() => onClick(image)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};


export default ImageGallery;