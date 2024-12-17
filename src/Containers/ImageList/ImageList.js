import React from 'react';
import styles from './ImageList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImage } from '../../store/slices/imageSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ImageList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currPage, setCurrPage] = React.useState(1);
    const [maxPage, setMaxPage] = React.useState(10);
    const [imageList, setImageList] = React.useState([]);

    // const { fetchImageResponse, loading, error } = useSelector((state) => state.image.fetchImageResponse);

    useEffect(() => {
        dispatch(fetchImage({currPage: currPage})).then((result) => {
            setCurrPage(result.payload.page);
            setMaxPage(result.payload.max_page);
            setImageList(result.payload.patients.map((patient) => {return patient.patient_id}));
        });

        
    }
    , [dispatch]);

    const handleDetail = (id) => { 
        navigate(`/photodetail/${id}`);
    }

    // Handle "Previous Page"
    const handlePrevPage = () => {
        if (currPage > 1) {
            dispatch(fetchImage({currPage: currPage - 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setImageList(result.payload.patients.map((patient) => {return patient.patient_id}));
            });
            setCurrPage(currPage - 1);
        }
    };

    // Handle "Next Page"
    const handleNextPage = () => {
        if (currPage < maxPage) {
            dispatch(fetchImage({currPage: currPage + 1})).then((result) => {
                setCurrPage(result.payload.page);
                setMaxPage(result.payload.max_page);
                setImageList(result.payload.patients.map((patient) => {return patient.patient_id}));
            });
            setCurrPage(currPage + 1);
        }
    };

    // const tableData = fetchImageResponse.patients.map((patient) => {return patient.id})

    return (
        <div className={styles.container}>
          <h5>학습 데이터 확인</h5>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="text-center">순번</th>
                <th className="text-center">자료 확인</th>
              </tr>
            </thead>
            <tbody>
              {imageList.map((row) => (
                <tr key={row}>
                  <td>{row}</td>
                  <td>
                    <button className={styles.button} onClick={() => handleDetail(row)}>상세조회</button>
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

export default ImageList;