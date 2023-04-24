import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { createContext, useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import EditionPage from "./pages/EditionPage/EditionPage";

export const userInfo = createContext();
export const editInfo = createContext();

export default function App() {
  const [toEdit, setToEdit] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (localUserInfo) {
      setUser(localUserInfo);
    }
  },[]);


  return (
    <BrowserRouter>
      <userInfo.Provider value={{ user, setUser }} >
        <editInfo.Provider value={{ toEdit, setToEdit }} >
          <Routes>
            <Route exact path="/" element={<SignInPage />} />
            <Route exact path="/cadastro" element={<SignUpPage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/nova-transacao/:type" element={<TransactionPage />} />
            <Route exact path="/editar-registro/:type" element={<EditionPage />} />
          </Routes>
        </editInfo.Provider>
      </userInfo.Provider>
    </BrowserRouter>
  );
}
