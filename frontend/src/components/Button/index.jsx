import styles from './button.module.css';

const Button = ({isLoading, children, ...rest}) => {

    return <>
        <button disabled={isLoading} {...rest} className={`${styles.button} ${isLoading && styles.loading}` }>
            <span>{children}</span>
        </button>
    </>

}
export default Button;