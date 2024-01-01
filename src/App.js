import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { IsAuth } from "./components/auth";
import Management from "./pages/management";
import News from "./pages/news";
import Vacancies from "./pages/vacancies";
import HelpCenter from "./pages/help-center";
import Applications from "./pages/applications";
import NotFound from "./pages/notFoundPage";
import Countries from "./pages/countries";
import Charters from "./pages/charters";
import MainPage from "./pages/main-page";
import Services from "./pages/services";
import Directions from "./pages/directions";
import { TopStatus } from "./components/top-status";

function App() {
  return (
    <Router>
      <div className="App">
        <TopStatus />
        <Routes>
          <Route
            path="/login"
            element={
              <IsAuth path="/">
                <LoginPage />
              </IsAuth>
            }
          />
          <Route
            path="/management"
            element={
              <IsAuth path="/management">
                <Management />
              </IsAuth>
            }
          />
          <Route
            path="/news"
            element={
              <IsAuth path="/news">
                <News />
              </IsAuth>
            }
          />
          <Route
            path="/vacancies"
            element={
              <IsAuth path="/vacancies">
                <Vacancies />
              </IsAuth>
            }
          />
          <Route
            path="/help-center"
            element={
              <IsAuth path="/help-center">
                <HelpCenter />
              </IsAuth>
            }
          />
          <Route
            path="/applications"
            element={
              <IsAuth path="/applications">
                <Applications />
              </IsAuth>
            }
          />
          <Route
            path="/countries"
            element={
              <IsAuth path="/countries">
                <Countries />
              </IsAuth>
            }
          />
          <Route
            path="/charters"
            element={
              <IsAuth path="/charters">
                <Charters />
              </IsAuth>
            }
          />
          <Route
            path="/"
            element={
              <IsAuth path="/">
                <MainPage />
              </IsAuth>
            }
          />
          <Route
            path="/services"
            element={
              <IsAuth path="/services">
                <Services />
              </IsAuth>
            }
          />
          <Route
            path="/directions"
            element={
              <IsAuth path="/directions">
                <Directions />
              </IsAuth>
            }
          />
          <Route
            path="*"
            element={
              <IsAuth path="/not-found">
                <NotFound />
              </IsAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
