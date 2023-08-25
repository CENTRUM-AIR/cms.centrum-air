import "./App.css";
import { SideBar } from "./components/sideBar";
import { Additional } from "./pages/additional";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { IsAuth } from "./components/auth";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <IsAuth>
          <SideBar />
        </IsAuth> */}
        <Routes>
          <Route
            path="/"
            element={
              <IsAuth>
                <Additional />
              </IsAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="card/:id" element={<CardPreview />} /> */}
          {/* {user.role === "admin" && ( */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
          {/* )} */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
