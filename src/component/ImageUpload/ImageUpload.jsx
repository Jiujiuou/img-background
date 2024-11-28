import styles from "./index.module.less";
import useStore from "@/store";

function ImageUpload() {
  const { updateImageBase64Url } = useStore();

  const handleUploadImage = () => {
    document.getElementById("upload-input").click();
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const imageData = e.target.result;
      updateImageBase64Url(imageData);
    };
  };

  return (
    <div className={styles.input} onClick={handleUploadImage}>
      上传图片
      <input
        type="file"
        accept="image/*"
        className={styles.realInput}
        onChange={(e) => handleFileChange(e.target.files[0])}
        id="upload-input"
      />
    </div>
  );
}

export default ImageUpload;
