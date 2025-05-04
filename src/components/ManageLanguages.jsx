import React, { useEffect, useState } from "react";

const API_Base = "http://localhost:5001"; // Base API URL

const ManageLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_Base}/lab/languages`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch languages");

      const data = await response.json();
      const languageList = data.map((item) => item.language); // Extract language names
      setLanguages(languageList);
    } catch (err) {
      console.error("Error fetching languages:", err);
      setError("Could not load languages. Try again.");
    }
  };

  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) return; // Prevent empty input

    try {
      const response = await fetch(`${API_Base}/lab/languages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (!response.ok) throw new Error("Failed to add language");

      setLanguages((prev) => [...prev, newLanguage]); // Update UI
      setNewLanguage(""); // Reset input field
    } catch (err) {
      console.error("Error adding language:", err);
      setError("Could not add language. Try again.");
    }
  };

  const handleDeleteLanguage = async (language) => {
    try {
      const response = await fetch(`${API_Base}/lab/languages/${language}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete language");

      setLanguages((prev) => prev.filter((lang) => lang !== language)); // Remove from UI
    } catch (err) {
      console.error("Error deleting language:", err);
      setError("Could not delete language. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Manage Languages</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Language Form */}
      <div>
        <input
          type="text"
          placeholder="Enter new language"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <button onClick={handleAddLanguage}>Add Language</button>
      </div>

      {/* Display Languages */}
      <h3>Existing Languages</h3>
      {!languages.length ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>
              {lang}
              <button onClick={() => handleDeleteLanguage(lang)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageLanguages;
