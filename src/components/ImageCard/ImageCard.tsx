import styles from "./ImageCard.module.css";
import { UnsplashImage  } from "../../types";


interface ImageCardProps {
  image: UnsplashImage ;
  onClick: (image: UnsplashImage ) => void;
  className?: string;
}


const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, className }) => {
  return (
    <div className={className} onClick={() => onClick(image)}>
      <img className={styles.items} src={image.urls.small} alt={image.alt_description || "Image"} />
    </div>
  );
};


export default ImageCard;
