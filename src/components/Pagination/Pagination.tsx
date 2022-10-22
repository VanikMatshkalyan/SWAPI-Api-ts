import React, { useCallback, useMemo } from "react";
import { IPeopleData } from "../../Interfaces/people.interface";
import "./Pagination.css";

interface IPagination {
  page:number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data:IPeopleData;
  }

const Pagination = ({setPage, page, data}:IPagination): JSX.Element => {
  const changePage = useCallback(
    (page:number) => {
       setPage(page);
    },
    [setPage]
  );

  const activePage = useCallback(
    (item:number) => {
      if (item === page) {
        return "active";
      }
      return "";
    },
    [page]
  );

  const list = useMemo(() => {
    const arrLength = Math.ceil(data.count / 10);
    const pagesList = Array.from({ length: arrLength }, (_, i) => i + 1);
    return pagesList.map((page) => {
      return (
        <li
          className={`pag-item ${activePage(page)}`}
          onClick={() => changePage(page)}
          key={page}
        >
          {page}
        </li>
      );
    });
  }, [data.count, activePage, changePage]);

  return (
    <>
      <div className="pagination">
        <ul className="pag-area">
          <li className="pag-item" onClick={() => setPage(1)}>
            &#8676;
          </li>
          <li
            className="pag-item"
            onClick={() => setPage((page) => page - 1)}
          >
            &#8678;
          </li>
          {list}
          <li
            className="pag-item"
            onClick={() => setPage((page) => page + 1)}
          >
            &#8680;
          </li>
          <li
            className="pag-item"
            onClick={() => setPage(Math.ceil(data.count / 10))}
          >
            &#8677;
          </li>
          <div className="pag-last-item"></div>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
