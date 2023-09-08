import "./App.css";
import { Additional } from "./pages/additional";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { IsAuth } from "./components/auth";

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
