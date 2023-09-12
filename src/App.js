import "./App.css";
import { Additional } from "./pages/additional";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { IsAuth } from "./components/auth";
import Management from "./pages/management";
import { useEffect } from "react";
import { getUser } from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharters,
  fetchCountries,
  fetchMainPage,
  fetchOffers,
  fetchServices,
} from "./store/get-api-info";

function App() {
  const { login: authLogin } = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authLogin) {
      dispatch(fetchMainPage());
      dispatch(fetchOffers());
      dispatch(fetchServices());
      dispatch(fetchCountries());
      dispatch(fetchCharters());
    }
  }, [authLogin]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <IsAuth>
                <Additional />
              </IsAuth>
            }
          />
          <Route
            path="/login"
            element={
              <IsAuth>
                <LoginPage />
              </IsAuth>
            }
          />
          <Route
            path="/management"
            element={
              <IsAuth>
                <Management />
              </IsAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
