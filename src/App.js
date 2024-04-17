import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Main from "./components/Main";
import Loading from "./components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [totalResults, setTotalResults] = useState();
  const [index, setIndex] = useState(10);

  const fetchFunc = async (country) => {
    setIndex(10);
    setIsLoading(true);
    const options = {
      method: "GET",
      url: `https://news-api14.p.rapidapi.com/top-headlines`,
      params: {
        country,
        language: country,
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setTotalResults(response.data.totalResults);
      setArticles(response.data.articles.slice(0, 10));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFunc(selectedCountry);
  }, [selectedCountry]);

  const fetchMoreData = async () => {
    const options = {
      method: "GET",
      url: `https://news-api14.p.rapidapi.com/top-headlines`,
      params: {
        country: selectedCountry,
        language: selectedCountry,
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setIndex(index + 10);
      setArticles(response.data.articles.slice(0, index + 10));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <GlobalContext.Provider
        value={{
          articles,
          setArticles,
          selectedCountry,
          setSelectedCountry,
          fetchFunc,
        }}
      >
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={articles.length > totalResults ? "" : <Loading />}
        >
          {isLoading ? <Loading /> : articles !== undefined && <Main />}
        </InfiniteScroll>
      </GlobalContext.Provider>
    </>
  );
};

export default App;
