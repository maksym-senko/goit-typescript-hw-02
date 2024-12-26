import Modal from "react-modal";
import styles from "./ImageModal.module.css";


interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
}


interface ImageModalProps {
  isOpen: boolean;
  image: Image;
  onClose: () => void;
}


Modal.setAppElement("#root");


const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modalContent}
      overlayClassName={styles.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        className={styles.image}
      />
      <button onClick={onClose} className={styles.closeButton}>
        Close
      </button>
    </Modal>
  );
};


export default ImageModal;
