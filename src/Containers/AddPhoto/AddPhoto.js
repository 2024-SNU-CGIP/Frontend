import React from "react";
import styles from "./AddPhoto.module.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../store/slices/imageSlice";
import { useNavigate } from "react-router";

const AddPhoto = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [imageU, setImageU] = useState(null); // Store the selected file locally
    const [imageL, setImageL] = useState(null); // Store the selected file locally
    const [imageLAT, setImageLAT] = useState(null); // Store the selected file locally
    const [extractData, setExtractData] = useState(false);

    const imageURef = useRef(null);
    const imageLRef = useRef(null);
    const imageLATRef = useRef(null);


    const handleImageU = (e) => {
        if (!e.target.files[0]) return;
        setImageU(e.target.files[0]);
    }
    
    const handleImageL = (e) => {
        if (!e.target.files[0]) return;
        setImageL(e.target.files[0]);
    }

    const handleImageLAT = (e) => {
        if (!e.target.files[0]) return;
        setImageLAT(e.target.files[0]);
    }

    const handleButtonUClick = () => {
        imageURef.current.click();
    }

    const handleButtonLClick = () => {
        imageLRef.current.click();
    }

    const handleButtonLATClick = () => {
        imageLATRef.current.click();
    }

    const handleAddData = () => {
        // check all 3 images are uploaded
        if (!imageU || !imageL || !imageLAT) {
            alert("사진을 모두 추가해 주세요.");
            return;
        }

        const data = {
            lat : imageLAT,
            U : imageU,
            L : imageL,
            label : extractData ? 1 : 0,
        }

        const result = dispatch(uploadImage({ data })).unwrap();
        console.log(result);

        navigate("/dashboard");
    }

  return (
    <div className={styles.container}>
      {/* Photo Upload Section */}
      <div className={styles.photoSection}>
        <div className={styles.photoSubSection}>

            <h4>LAT</h4>
            <div className={styles.photoBox}>
                <input type="file" accept="image/*" style={{ display: "none" }} // Hide the input
                    ref={imageLATRef} // Attach the ref
                    onChange={handleImageLAT} // Handle file selection
                />
                { !imageLAT && <button className={styles.addPhotoButton} onClick={handleButtonLATClick} >Add Photo</button> }
                { imageLAT && <img className={styles.photoBox} onClick={handleButtonLATClick} src={URL.createObjectURL(imageLAT)} alt="LAT" /> }
            </div>
        </div>
        <div className={styles.photoSubSection}>

            <h4>상악</h4>
            <div className={styles.photoBox}>
                <input type="file" accept="image/*" style={{ display: "none" }} // Hide the input
                    ref={imageURef} // Attach the ref
                    onChange={handleImageU} // Handle file selection
                />
                { !imageU && <button className={styles.addPhotoButton} onClick={handleButtonUClick} >Add Photo</button> }
                { imageU && <img className={styles.photoBox} onClick={handleButtonUClick} src={URL.createObjectURL(imageU)} alt="상악" /> }
            </div>
            <h4>하악</h4>
          <div className={styles.photoBox}>
            <input type="file" accept="image/*" style={{ display: "none" }} // Hide the input
                ref={imageLRef} // Attach the ref
                onChange={handleImageL} // Handle file selection
            />
            { !imageL && <button className={styles.addPhotoButton} onClick={handleButtonLClick} >Add Photo</button> }
            { imageL && <img className={styles.photoBox} onClick={handleButtonLClick} src={URL.createObjectURL(imageL)} alt="하악" /> }
          </div>
        </div>
      </div>

      {/* Data Info Section */}
      <div className={styles.dataInfoSection}>
        <h3>데이터 정보</h3>
        <div className={styles.dataRow}>
          <div className={styles.toggle}>
            <input type="checkbox" id="toggle" className={styles.toggleInput} value={extractData} onChange={(e) => setExtractData(e)}/>
            <label htmlFor="toggle" className={styles.toggleLabel}></label>
            <span>발치 여부</span>
          </div>
          <button className={styles.actionButton} onClick={handleAddData}>학습 데이터 추가</button>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;