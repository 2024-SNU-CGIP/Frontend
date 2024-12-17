import React, { useCallback } from "react";
import styles from "./TestPatient.module.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { predictModel } from "../../store/slices/modelSlice";
import { useNavigate } from "react-router";

const TestPatient = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [imageU, setImageU] = useState(null); // Store the selected file locally
    const [imageL, setImageL] = useState(null); // Store the selected file locally
    const [imageLAT, setImageLAT] = useState(null); // Store the selected file locally
    const [patientName, setPatientName] = useState("");
    const [patientBirth, setPatientBirth] = useState("");

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

    const handleTestButton = () => {
        // check all 3 images are uploaded
        if (!imageU || !imageL || !imageLAT) {
            alert("사진을 모두 추가해 주세요.");
            return;
        }

        // check patient info
        if (!patientName || !patientBirth) {
            alert("환자 정보를 모두 입력해 주세요.");
            return;
        }

        if (patientBirth.length !== 6) {
            alert("생년월일을 확인해 주세요.");
            return;
        }

        // send data to server
        const data = {
            lat : imageLAT,
            U : imageU,
            L : imageL,
            name : patientName,
            birth : patientBirth,
        }

        const result = dispatch(predictModel({ data })).finally(() => {
            navigate("/");
        });
        
    }

    const handleNameChange = useCallback((e) => {
        setPatientName(e.target.value);
    }, []);

    const handleBirthChange = useCallback((e) => {
        setPatientBirth(e.target.value);
    }, []);



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
                        value={patientName}
                        onChange={handleNameChange}
                        placeholder="홍길동"
                    />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="patientBirth" className={styles.label}>
                    생년월일
                </label>
                <div>
                    <input
                        type="text"
                        id="patientBirth"
                        className={styles.input}
                        value={patientBirth}
                        onChange={handleBirthChange}
                        placeholder="YYMMDD"
                    />
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <button type="button" className={styles.actionButton} onClick={handleTestButton} >
                발치 여부 조회
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default TestPatient;