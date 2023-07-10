import { useState } from "react";
import { API_URL } from "../config";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("files", image);
      formData.append("ref", "events");
      formData.append("refId", evtId);
      formData.append("field", "image");

      console.log("formData: ", formData.get("files"));

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      console.log("image upload response: ", res)
      if (res.ok) {
        imageUploaded();
      }
    } catch (error) {console.log("error in updating image: ", error)}
  };

  const handleFileChange = (e) => {
    console.log("file change: ", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
