import {useState} from 'react';
import { API_URL } from '../config';
import styles from '@/styles/Form.module.css';

export default function ImageUpload({evtId, imageUploaded}) {
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleFileChange = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.form}>
      <h1>Upload Image Component</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className='btn'/>
      </form>
    </div>
  );
}