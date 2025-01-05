import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";
import Emails from "./pages/Emails";
import ProtectedRoute from "./components/ProtectedRoute";

import "react-quill/dist/quill.snow.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute >
              <Emails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
