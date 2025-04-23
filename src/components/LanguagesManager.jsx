import React, { useState, useEffect } from "react";

const API_Base = "http://localhost:5001"; // Replace with your backend base URL

const LanguagesManager = ({ userId }) => {
  const [languages, setLanguages] = useState([]); // Store the languages the user knows
  const [newLanguage, setNewLanguage] = useState(""); // Store the new language to be added
  const [error, setError] = useState(""); // Error handling

  // Fetch all languages a user knows
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(`${API_Base}/lab/users/${userId}/languages`);
        if (!res.ok) throw new Error("Failed to fetch languages");
        const data = await res.json();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
        setError("Could not load languages. Please try again.");
      }
    };

    fetchLanguages();
  }, [userId]);

  // Add a new language for the user
  const handleAddLanguage = async () => {
    if (!newLanguage.trim()) {
      setError("Language name cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${API_Base}/lab/users/${userId}/languages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (!res.ok) throw new Error("Failed to add language");
      const addedLanguage = await res.json();
      setLanguages((prev) => [...prev, addedLanguage]); // Update state with new language
      setNewLanguage(""); // Reset input field
      setError(""); // Clear error
    } catch (error) {
      console.error("Error adding language:", error);
      setError("Could not add the language. Please try again.");
    }
  };

  // Delete a language the user knows
  const handleDeleteLanguage = async (language) => {
    try {
      const res = await fetch(
        `${API_Base}/lab/users/${userId}/languages/${language}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete language");
      setLanguages((prev) => prev.filter((language) => language !== language)); // Remove language from state
    } catch (error) {
      console.error("Error deleting language:", error);
      setError("Could not delete the language. Please try again.");
    }
  };

  return (
    <div>
      <h2>User's Languages</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {languages.length === 0 ? (
        <p>No languages found.</p>
      ) : (
        <ul>
          {languages.map((language, index) => (
            <li key={index}>
              {language}
              <button onClick={() => handleDeleteLanguage(language)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div>
        <input
          type="text"
          placeholder="Add a new language"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <button onClick={handleAddLanguage}>Add Language</button>
      </div>
    </div>
  );
};

export default LanguagesManager;
