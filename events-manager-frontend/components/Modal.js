import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/Modal.module.css';
import {FaTimes} from 'react-icons/fa';

const Modal = function({ show, onClose, children, title }){
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(()=>{
    const effect = () => {
      setIsBrowser(true)
    };
    effect();
  },[])

  const handleClose = (e) => {
      e.preventDefault();
      onClose();
  };

  const modalContent = show ? (
      <div className={styles.overlay}>
          <div className={styles.wrapper}>
              <div className={styles.modal}>
                  <div className={styles.header}>
                      <a href="#" onClick={handleClose}>
                          <FaTimes/>
                      </a>
                  </div>
                  {title && <h1>{title}</h1>}
                  <div className={styles.body}>{children}</div>
              </div>
          </div>
      </div>
  ) : null;

  if(isBrowser){
    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
  }else{
    return null
  }
};

export default Modal