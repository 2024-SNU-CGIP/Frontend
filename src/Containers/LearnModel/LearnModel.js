import React, { useEffect } from "react";
import styles from "./LearnModel.module.css";
import { useDispatch } from "react-redux";
import { modelStat, fetchModelList, startTraining } from "../../store/slices/modelSlice";
import learnTimeLogo from "../../img/learn-time.png";
import imageCountLogo from "../../img/learn-image.png";
import percentLogo from "../../img/learn-percent.png";



const LearnModel = () => {

    const dispatch = useDispatch();

    const [dataCount, setDataCount] = React.useState(0);
    const [recentTime, setRecentTime] = React.useState("");
    const [modelAccuracy, setModelAccuracy] = React.useState(0);

    const [currPage, setCurrPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(10);
    const [trainList, setTrainList] = React.useState([]);

    useEffect(() => {
        dispatch(modelStat()).then((result) => {
            setDataCount(result.payload.recent_data_count);
            setRecentTime(result.payload.recent_train_date);
            setModelAccuracy(result.payload.highest_accuracy);
        });

        dispatch(fetchModelList({currPage: currPage})).then((result) => {
            setCurrPage(result.payload.page);
            setMaxPage(result.payload.max_page);
            setTrainList(result.payload.results);
        });
    }, [dispatch]);

    const handlePrevPage = () => {
        if (currPage > 1) {
            dispatch(fetchModelList({currPage: currPage - 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setTrainList(result.payload.results);
            });
            setCurrPage(currPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currPage < maxPage) {
            dispatch(fetchModelList({currPage: currPage + 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setTrainList(result.payload.results);
            });
            setCurrPage(currPage + 1);
        }
    };

    const handleTrainStart = () => {
        dispatch(startTraining())
    };


  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h2>모델 학습하기</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.icon}>
                <img src={imageCountLogo} width="50px"/>
            </div>
            <div className={styles.cardContent}>
              <span>현재 데이터 개수</span>
              <strong>{dataCount}</strong>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
                <img src={learnTimeLogo} width="50px"/>
            </div>
            <div className={styles.cardContent}>
              <span>최근 학습 시간</span>
              <strong>{recentTime}</strong>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
                <img src={percentLogo} width="50px"/>
            </div>
            <div className={styles.cardContent}>
              <span>모델 정확도</span>
              <strong>{`${(modelAccuracy * 100).toFixed(3)}%`}</strong>
            </div>
          </div>
        </div>
        <button className={styles.actionButton} onClick={handleTrainStart}>현재 데이터로 학습</button>
      </div>

      {/* Table Section */}
      <div className={styles.tableSection}>
        <h2>모델 학습 기록</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="text-center">학습 id</th>
              <th className="text-center">학습 상태</th>
              <th className="text-center">모델 정확도</th>
              <th className="text-center">학습 시간</th>
            </tr>
          </thead>
          <tbody>
            {trainList.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.status === "failed" ? `${record.status} : ${result.result}` : record.status}</td>
                <td>{(record.test_accuracy * 100).toFixed(3)}</td>
                <td>{record.training_time}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currPage === 1}>
                이전 페이지
            </button>
            <span>
                {currPage} / {maxPage}
            </span>
            <button onClick={handleNextPage} disabled={currPage === maxPage}>
                다음 페이지
            </button>
        </div>
    </div>
  );
};

export default LearnModel;