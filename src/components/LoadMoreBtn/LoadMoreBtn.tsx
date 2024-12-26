import style from "./LoadMoreBtn.module.css";


interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading: boolean;
}


const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, isLoading }) => {
  return (
    <div className={style.btnLoadMoreContainer}>
      <button className={style.btnLoadMore} onClick={onClick} disabled={isLoading}>
        {isLoading ? <span></span> : "Load more"}
      </button>
    </div>
  );
};


export default LoadMoreBtn;
