const api = {
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_API || "http://localhost:5000"
      : process.env.REACT_APP_PROD_API || "https://goodfellas.herokuapp.com",
};

export default api;
