import { BrowserRouter, Route, Routes , Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
import isLoggedIn from "../utils/isLoggedIn";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

const AppRoutes = () => {
  const [auth, setAuth] = useState(null);

 useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await isLoggedIn();
        setAuth(result);
      } catch (err) {
        console.log("Auth error:", err);
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div>Checking auth...</div>;

  return (
    <BrowserRouter>
     <Routes>
        <Route 
          path="/" 
          element={auth ? <Home setAuth={setAuth}/> : <Navigate to="/login" />} 
        />

        <Route 
          path="/register" 
          element={!auth ? <Register setAuth={setAuth} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!auth ? <Login setAuth={setAuth} /> : <Navigate to="/" />} 
        />

        <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
