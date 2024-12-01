import React from "react";
import styles from "./PhotoDetail.module.css";

const PhotoDetail = () => {
    const tableData = [
        { id: "01", patientId: "0128491", name: "홍길동", status: "확인중", time: "2024.11.13. 18:21:02" },
    ];

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
            <div className={styles.dataInfoSection}>
                <h5>발치 여부 데이터</h5>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th class="text-center">순번</th>
                        <th class="text-center">환자번호</th>
                        <th class="text-center">이름</th>
                        <th class="text-center">발치 여부</th>
                        <th class="text-center">확인 시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row) => (
                        <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.patientId}</td>
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>{row.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default PhotoDetail;
