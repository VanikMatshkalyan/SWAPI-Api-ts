import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./About.css";
import "../Menu/Menu";
import Pagination from "../Pagination/Pagination";
import logo from "../../assets/logo.png";
import { IPeopleData, IResults } from "../../Interfaces/people.interface";

const About = (): JSX.Element => {
  const [data, setData] = useState<IPeopleData>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });
  const [itemData, setItemData] = useState<IResults | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackClick = (): void => {
    setItemData(null);
  };

  const click = useCallback((item: IResults): void => {
    setItemData(item);
  }, []);

  const init = useCallback(async (): Promise<void> => {
    setLoading(true);
    const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
    const data: IPeopleData = await response.json();
    setData(data);
    setLoading(false);
  }, [page]);

  const list = useMemo((): false | JSX.Element => {
    return (
      data &&
      data?.results?.length > 0 && (
        <div className="items-list">
          {data.results.map((item, index) => (
            <div key={index} className="item" onClick={() => click(item)}>
              {item.name}
            </div>
          ))}
        </div>
      )
    );
  }, [data, click]);

  useEffect(() => {
    init();
  }, [page, init]);

  const grid = useMemo(() => {
    return itemData ? (
      <div className="item-detail">
        <div className="button-area">
          <button onClick={handleBackClick}>&larr; back</button>
        </div>
        <div className="people-name">{itemData.name}</div>
        <div className="item-detail-area">
          Birth Year: {itemData.birth_year}
        </div>
        <div className="item-detail-area">Gender: {itemData.gender}</div>
        <div className="item-detail-area">Height: {itemData.height}</div>
        <div className="item-detail-area">
          Skin Color: {itemData.skin_color}
        </div>
        <div className="item-detail-area">
          Hair Color: {itemData.hair_color}
        </div>
        <div className="item-detail-area">Eye Color: {itemData.eye_color}</div>
      </div>
    ) : (
      <div className="items-container">{list}</div>
    );
  }, [itemData, list]);

  return (
    <>
      <div className="full">
        <div className="container1">
          <div className="section-wrapper">
            <img src={logo} alt="logo" />
          </div>
          <div className="section-wrapper-area">
            <div className="section">
              <div className="title">Vanik Matshkalyan</div>
              <div className="title">Vanik</div>
              <div className="title">vanik.matshkalyan@gmail.com</div>
              <div className="title">Yerevan-Armenia</div>
            </div>
          </div>
        </div>
        <div className="container2">
          {!itemData ? (
            <div className="title-area">
              <ul className="info-area">
                <li className="list">Peoples</li>
                <li className="list">Planets</li>
                <li className="list">Species</li>
                <li className="list">Starships</li>
                <li className="list">Vehiscles</li>
              </ul>
            </div>
          ) : null}

          {loading ? (
            <div className="loader">
              <div className="center-body">
                <div className="loader-circle-9">
                  Loading
                  <span></span>
                </div>
              </div>
            </div>
          ) : (
            grid
          )}
          <Pagination data={data} setPage={setPage} page={page} />
        </div>
      </div>
    </>
  );
};

export default About;
