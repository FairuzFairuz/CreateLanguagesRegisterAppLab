import React from "react";
import UsersDetailsPage from "./components/UsersDetailsPage";
import UsersPage from "./components/UsersPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LanguagesPage from "./components/LanguagesPage";
import Header from "./components/Header";
import ManageLanguages from "./components/ManageLanguages";
import ManageUsers from "./components/ManageUsers";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UsersDetailsPage />} />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/manage-languages" element={<ManageLanguages />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
