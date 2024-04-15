import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Main from "./components/Main";
import Loading from "./components/Loading";
import { Category } from "@mui/icons-material";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState();
  const [selectedCountry, setSelectedCountry] = useState("US");

  const fetchFunc = async (country) => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: "https://news-api14.p.rapidapi.com/top-headlines",
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
      console.log(response.data);
      setArticles(response.data.articles);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFunc(selectedCountry);
  }, []);
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
        {isLoading ? <Loading /> : articles !== undefined && <Main />}
      </GlobalContext.Provider>
    </>
  );
};

export default App;
