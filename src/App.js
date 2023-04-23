import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { createContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";

export const userInfo = createContext();

export default function App() {
  const [user, setUser] = useState({token: 'b86b483c-9255-453b-844b-c4ea96c22972'});

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (localUserInfo) setUser({ localUserInfo });
  }, []);



  return (
    <BrowserRouter>
      <userInfo.Provider value={{ user, setUser }} >
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/cadastro" element={<SignUpPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/nova-transacao/:type" element={<TransactionPage />} />
        </Routes>
      </userInfo.Provider>
    </BrowserRouter>
  );
}

/*
font-family: 'Raleway', sans-serif;
font-family: 'Saira Stencil One', cursive;
*/