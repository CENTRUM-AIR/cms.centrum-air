
import "./App.css";
import { SideBar } from "./components/sideBar";
import { Additional } from "./pages/additional";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        {/* {user.status ? (
          <> */}
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Additional />} />
              {/* <Route path="card/:id" element={<CardPreview />} /> */}
              {/* {user.role === "admin" && ( */}
                {/* <Route path="settings" element={<SettingsPage />} /> */}
              {/* )} */}
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          {/* </>
        ) : (
          <SignInPage />
        )} */}
      </div>
    </Router>
  );
}

export default App;
