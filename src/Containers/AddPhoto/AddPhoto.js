import React from "react";
import styles from "./AddPhoto.module.css";

const AddPhoto = () => {
  return (
    <div className={styles.container}>
      {/* Photo Upload Section */}
      <div className={styles.photoSection}>
        <div className={styles.photoSubSection}>
            <div className={styles.photoBox}>
            <h3>LAT</h3>
            <button className={styles.addPhotoButton}>Add Photo</button>
            </div>
        </div>
        <div className={styles.photoSubSection}>
          <div className={styles.photoBox}>
            <h3>상악</h3>
            <button className={styles.addPhotoButton}>Add Photo</button>
          </div>
          <div className={styles.photoBox}>
            <h3>하악</h3>
            <button className={styles.addPhotoButton}>Add Photo</button>
          </div>
        </div>
      </div>

      {/* Data Info Section */}
      <div className={styles.dataInfoSection}>
        <h3>데이터 정보</h3>
        <div className={styles.dataRow}>
          <div className={styles.toggle}>
            <input type="checkbox" id="toggle" className={styles.toggleInput} />
            <label htmlFor="toggle" className={styles.toggleLabel}></label>
            <span>발치 여부</span>
          </div>
          <button className={styles.actionButton}>학습 데이터 추가</button>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;