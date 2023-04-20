import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { createContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage";

export const userToken = createContext();

export default function App() {
  const [token, setToken] = useState('');

  // useEffect(() => {
  //   const localToken = JSON.parse(localStorage.getItem('token'));
  //   if (localToken) setToken(localToken);
  // }, []);



  return (
    <BrowserRouter>
      <userToken.Provider value={{ token, setToken }} >
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/cadastro" element={<SignUpPage />} />
          <Route exact path="/home" element={<HomePage />} />
        </Routes>
      </userToken.Provider>
    </BrowserRouter>
  );
}

/*
font-family: 'Raleway', sans-serif;
font-family: 'Saira Stencil One', cursive;
*/