import React from "react";
import styles from "./TestPatient.module.css";

const TestPatient = () => {
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
        <h2 className={styles.title}>환자 정보</h2>
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="patientName" className={styles.label}>
                    환자명
                </label>
                <div>
                    <input
                        type="text"
                        id="patientName"
                        className={styles.input}
                        value="홍길동"
                    />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="patientNumber" className={styles.label}>
                    환자 번호
                </label>
                <div>
                    <input
                        type="text"
                        id="patientNumber"
                        className={styles.input}
                        value="0129401839"
                    />
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <button type="button" className={styles.actionButton}>
                발치 여부 조회
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default TestPatient;