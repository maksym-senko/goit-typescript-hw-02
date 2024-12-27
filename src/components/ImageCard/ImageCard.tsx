import styles from "./ImageCard.module.css";
import { Image } from "../../types";


interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
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
