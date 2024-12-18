import React from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImage } from '../../store/slices/imageSlice';
import { useEffect } from 'react';
import { fetchPredictList } from '../../store/slices/modelSlice';
import { useNavigate } from 'react-router';

const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currPage, setCurrPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(10);
    const [predictList, setPredictList] = React.useState([]);
    // const { currImageList, loading, error } = useSelector((state) => state.image);

    useEffect(() => {
        dispatch(fetchPredictList({currPage: currPage})).then((result) => {
            setCurrPage(result.payload.page);
            setMaxPage(result.payload.max_page);
            setPredictList(result.payload.results);
            console.log(result.payload.results);
        });
    }
    , [dispatch]);

    const handlePrevPage = () => {
        if (currPage > 1) {
            dispatch(fetchPredictList({currPage: currPage - 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setPredictList(result.payload.results);
            });
            setCurrPage(currPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currPage < maxPage) {
            dispatch(fetchPredictList({currPage: currPage + 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setPredictList(result.payload.results);
            });
            setCurrPage(currPage + 1);
        }
    };

    const handleDetail = (id) => {
        navigate(`/predictresult/${id}`);
    }



    return (
        <div className={styles.container}>
          <h5>발치 여부 데이터</h5>
          <table className={styles.table}>
            <thead>
              <tr>
                <th class="text-center">예측 id</th>
                <th class="text-center">생년월일</th>
                <th class="text-center">이름</th>
                <th class="text-center">발치 여부</th>
                <th class="text-center">자료 확인</th>
              </tr>
            </thead>
            <tbody>
            {predictList.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.birthdate}</td>
                  <td>{row.name}</td>
                  <td>{row.status === "completed" ? (row.result >= 0.5 ? "미발치" : "발치") : "확인중"}</td>
                  <td>
                    <button className={styles.button} onClick={() => {handleDetail(row.id)}}>상세조회</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
}

export default Dashboard;
