import styles from "./LoadMoreBtn.module.css";


interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading: boolean;
}


const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isLoading }) => {
  return (
    <div className={styles.btnLoadMoreContainer}>
      <button className={styles.btnLoadMore} onClick={onClick} disabled={isLoading}>
        {isLoading ? <span></span> : "Load more"}
      </button>
    </div>
  );
};


export default LoadMoreBtn;
