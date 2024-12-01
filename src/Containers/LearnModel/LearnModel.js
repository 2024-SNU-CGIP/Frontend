import React from "react";
import styles from "./LearnModel.module.css";

const LearnModel = () => {
  const dataRecords = [
    { id: "01", dataCount: "1,222 개", status: "학습 중", accuracy: "학습 중", time: "2024.11.13. 18:21:02", log: "확인하기" },
    { id: "02", dataCount: "1,222 개", status: "학습 완료", accuracy: "94.22%", time: "2024.11.13. 18:21:02", log: "확인하기" },
    { id: "03", dataCount: "1,212 개", status: "에러 발생", accuracy: "에러 발생", time: "2024.11.13. 18:21:02", log: "확인하기" },
  ];

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h2>모델 학습하기</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.icon}>📊</div>
            <div className={styles.cardContent}>
              <span>현재 데이터 개수</span>
              <strong>1,234 개</strong>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>🕒</div>
            <div className={styles.cardContent}>
              <span>최근 학습 시간</span>
              <strong>2024.11.13. 18:21:02</strong>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>📈</div>
            <div className={styles.cardContent}>
              <span>모델 정확도</span>
              <strong>94.29%</strong>
            </div>
          </div>
        </div>
        <button className={styles.actionButton}>현재 데이터로 학습</button>
      </div>

      {/* Table Section */}
      <div className={styles.tableSection}>
        <h2>모델 학습 기록</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th class="text-center">순번</th>
              <th class="text-center">데이터 개수</th>
              <th class="text-center">학습 상태</th>
              <th class="text-center">모델 정확도</th>
              <th class="text-center">학습 시간</th>
              <th class="text-center">로그 확인</th>
            </tr>
          </thead>
          <tbody>
            {dataRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.dataCount}</td>
                <td>{record.status}</td>
                <td>{record.accuracy}</td>
                <td>{record.time}</td>
                <td>
                  <button className={styles.logButton}>{record.log}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnModel;