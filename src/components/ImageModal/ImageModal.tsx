import Modal from "react-modal";
import styles from "./ImageModal.module.css";


Modal.setAppElement("#root");


interface Image {
  urls: {
    regular: string;
  };
  alt_description: string | null;
}


interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}


const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modalContent}
      overlayClassName={styles.overlay}
    >
      {image && (
        <>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
            className={styles.image}
          />
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </>
      )}
    </Modal>
  );
};


export default ImageModal;
