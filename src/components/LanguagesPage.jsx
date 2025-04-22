import React, { useState, useEffect } from "react";

const API_Base = import.meta.env.VITE_SERVER;

const LanguagesPage = () => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const res = await fetch(`${API_Base}/lab/languages`);
      if (!res.ok) throw new Error("Failed to fetch languages");
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };
  const handleDeleteLanguage = async (id) => {
    try {
      await fetch(`${API_Base}/lab/languages/${id}`, { method: "DELETE" });
      setLanguages((prev) => prev.filter((language) => language.id !== id));
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  return (
    <div className="container">
      <h2>Languages</h2>
      {languages.length === 0 ? (
        <p>No Languages Found</p>
      ) : (
        <ul>
          {languages.map((language) => (
            <li key={language.id}>
              {language.name}
              <button onClick={() => handleDeleteLanguage(language.id)}>
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
