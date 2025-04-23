import React, { useState, useEffect } from "react";

const API_Base = "http://localhost:5001";

const LanguagesPage = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const res = await fetch(`${API_Base}/lab/languages`);
      if (!res.ok) throw new Error("Failed to fetch languages");
      const data = await res.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) return;
    try {
      const res = await fetch(`${API_Base}/lab/languages`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: newLanguage }),
      });
      if (!res.ok) throw new Error("Failed to add language");

      const addedLanguage = await res.json();
      setLanguages((prev) => [...prev, addedLanguage]);
      setNewLanguage("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding language", error);
    }
  };
  const handleDeleteLanguage = async (id) => {
    try {
      await fetch(`${API_Base}/lab/languages/${id}`, { method: "DELETE" });
      setLanguages((prev) => prev.filter((language) => language.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  return (
    <div className="container">
      <h2>Languages</h2>
      <div>
        <input
          type="text"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          placeholder="Enter new language"
        />
        <button onClick={handleAddLanguage}>Add</button>
      </div>
      {languages.length === 0 ? (
        <p>No Languages Found</p>
      ) : (
        <ul>
          {languages.map((language) => (
            <li key={language.language}>
              {language.language}
              <button onClick={() => handleDeleteLanguage(language.language)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguagesPage;
