import React, { useEffect, useState } from "react";

const API_Base = "http://localhost:5001"; // ✅ Adjust if needed

const UserLanguages = ({ userId, userName }) => {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    if (userId) {
      handleFetchLanguages(userId); // ✅ Fetch data when component mounts
    }
  }, [userId]);

  const handleFetchLanguages = async (userId) => {
    const storedLanguages = localStorage.getItem(`languages_${userId}`);

    if (storedLanguages) {
      console.log("Loaded languages from localStorage:", storedLanguages);
      setLanguages(JSON.parse(storedLanguages)); // ✅ Load stored list
      return; // ✅ Avoid unnecessary API request
    }

    try {
      const response = await fetch(`${API_Base}/lab/users/languages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) throw new Error("Failed to fetch languages");

      const responseData = await response.json();
      console.log("Fetched Languages from API:", responseData);

      setLanguages(responseData || []);
      localStorage.setItem(`languages_${userId}`, JSON.stringify(responseData)); // ✅ Store updated data
    } catch (err) {
      console.error("Error fetching languages:", err);
      setError("Could not load languages. Try again.");
    }
  };
  const handleDeleteLanguage = async (userId, language) => {
    console.log("Deleting language:", language, "for user ID:", userId);

    try {
      const response = await fetch(`${API_Base}/lab/users/languages`, {
        method: "DELETE", // ✅ Ensure DELETE method is used
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, language }), // ✅ Correct request format
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${errorMessage}`);
      }

      console.log("Delete Language API Response:", await response.json());

      setLanguages((prev) => prev.filter((lang) => lang !== language)); // ✅ Remove from UI
    } catch (err) {
      console.error("Error deleting language:", err);
      setError("Could not delete language. Try again.");
    }
  };

  const handleAddLanguage = async (userId, newLanguage) => {
    if (!newLanguage.trim()) return;

    try {
      const response = await fetch(`${API_Base}/lab/users/languages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, language: newLanguage }),
      });

      const responseData = await response.json();
      console.log("Parsed API Response:", responseData);

      if (responseData.status !== "okay") {
        throw new Error("Failed to add language");
      }

      setLanguages((prev) => [...prev, newLanguage]);
      setNewLanguage("");
    } catch (err) {
      console.error("Error adding language:", err);
      setError("Could not add language. Try again.");
    }
  };
  return (
    <div>
      <h2>Languages for {userName}</h2>{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!languages.length ? (
        <p>No languages listed</p>
      ) : (
        <ul>
          {languages.map((lang) => (
            <li key={lang}>
              {lang}{" "}
              <button onClick={() => handleDeleteLanguage(userId, lang)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        placeholder="Add new language"
        value={newLanguage}
        onChange={(e) => setNewLanguage(e.target.value)}
      />
      <button onClick={() => handleAddLanguage(userId, newLanguage)}>
        Add Language
      </button>
    </div>
  );
};

export default UserLanguages;
