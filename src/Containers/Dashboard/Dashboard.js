import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const tableData = [
        { id: "01", patientId: "0128491", name: "홍길동", status: "확인중", time: "2024.11.13. 18:21:02" },
        { id: "02", patientId: "0128491", name: "김철수", status: "발치", time: "2024.11.13. 18:21:02" },
        { id: "03", patientId: "0128491", name: "가나다", status: "미발치", time: "2024.11.13. 18:21:02" },
        { id: "04", patientId: "0128491", name: "가나다", status: "미발치", time: "2024.11.13. 18:21:02" },
        { id: "05", patientId: "0128491", name: "가나다", status: "발치", time: "2024.11.13. 18:21:02" },
        { id: "06", patientId: "0128491", name: "가나다", status: "미발치", time: "2024.11.13. 18:21:02" },
        { id: "07", patientId: "0128491", name: "가나다", status: "발치", time: "2024.11.13. 18:21:02" },
        { id: "08", patientId: "0128491", name: "가나다", status: "미발치", time: "2024.11.13. 18:21:02" },
    ];

    return (
        <div className={styles.container}>
          <h5>발치 여부 데이터</h5>
          <table className={styles.table}>
            <thead>
              <tr>
                <th class="text-center">순번</th>
                <th class="text-center">환자번호</th>
                <th class="text-center">이름</th>
                <th class="text-center">발치 여부</th>
                <th class="text-center">확인 시간</th>
                <th class="text-center">자료 확인</th>
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
                  <td>
                    <button className={styles.button}>상세조회</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Dashboard;