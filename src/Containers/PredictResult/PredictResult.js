import React, { useEffect } from "react";
import styles from "./PredictResult.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPredictResultByTaskId } from "../../store/slices/modelSlice";
import { useState } from "react";
import { useNavigate } from "react-router";


const PredictResult = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { predictnum } = useParams();

    const [imageU, setImageU] = useState(null); // Store the selected file locally
    const [imageL, setImageL] = useState(null); // Store the selected file locally
    const [imageLAT, setImageLAT] = useState(null); // Store the selected file locall
    const [extract, setExtract] = useState(false);

    useEffect(() => {
        dispatch(fetchPredictResultByTaskId({predictnum: predictnum})).then((result) => {
            setImageU(result.payload.images.photo_U);
            setImageL(result.payload.images.photo_L);
            setImageLAT(result.payload.images.xray);
            setExtract(parseFloat(result.payload.label) <= 0.5 ? false : true);
            console.log(imageU);
        });

    }, [dispatch]);

    return (
        <div className={styles.container}>
            {/* Photo Upload Section */}
            <div className={styles.photoSection}>
                <div className={styles.photoSubSection}>
                    <h4>LAT</h4>
                    <div className={styles.photoBox}>
                        { !imageLAT ? <div className={styles.noPhotoDiv}>No Photo</div> : <img src={`data:image/png;base64, ${imageLAT}`} alt="LAT" className={styles.photo} /> }
                    </div>
                </div>
                <div className={styles.photoSubSection}>
                    <h4>상악</h4>
                    <div className={styles.photoBox}>
                        { !imageU && <div className={styles.noPhotoDiv}>No Photo</div> }
                        { imageU && <img src={`data:image/png;base64, ${imageU}`} alt="상악" className={styles.photo}/>}
                    </div>
                    <h4>하악</h4>
                    <div className={styles.photoBox}>
                        { !imageL ? <div className={styles.noPhotoDiv}>No Photo</div> : <img src={`data:image/png;base64, ${imageL}`} alt="하악" className={styles.photo} /> }
                    </div>
                </div>
            </div>
            <div className={styles.dataInfoSection}>
                <h5>발치 여부</h5>
                <div className={styles.dataInfo}>
                    { extract ? <div>발치</div> : <div>미발치</div> }
                </div>
            </div>
        </div>


    )
}

export default PredictResult;
