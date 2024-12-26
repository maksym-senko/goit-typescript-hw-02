import styles from "./ImageCard.module.css";


interface Image {
  urls: {
    small: string;
  };
  alt_description?: string;
}

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={() => onClick(image)}>
      <img
        className={styles.items}
        src={image.urls.small}
        alt={image.alt_description || "Image"}
      />
    </div>
  );
};


export default ImageCard;