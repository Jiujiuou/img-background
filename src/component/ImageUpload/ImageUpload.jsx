import styles from "./index.module.less";

function ImageUpload() {
  return (
    <div className={styles.input}>
      <input type="file" accept="image/*" style={{ display: "none" }} />
      上传图片
    </div>
  );
}

export default ImageUpload;
