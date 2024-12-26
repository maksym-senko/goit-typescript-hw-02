import styles from "./ErrorMessage.module.css"


interface ErrorMessageProps {
    message: string;
};


const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className={styles.ErrorMessage}>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;