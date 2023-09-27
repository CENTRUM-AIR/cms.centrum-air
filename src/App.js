import "./App.css";
import { Additional } from "./pages/additional";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { IsAuth } from "./components/auth";
import Management from "./pages/management";
import News from "./pages/news";
import Vacancies from "./pages/vacancies";
import HelpCenter from "./pages/help-center";
import Applications from "./pages/applications";
import NotFound from "./pages/notFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <IsAuth path="/">
                <Additional />
              </IsAuth>
            }
          />
          <Route
            path="/login"
            element={
              <IsAuth path="/additional">
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
