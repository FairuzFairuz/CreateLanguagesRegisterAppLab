import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const API_Base = "http://localhost:5001"; 

const LanguagesPage = () => {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${API_Base}/lab/languages`, {
          method: "GET",
        });

        if (!response.ok)
          throw new Error(`Failed to fetch languages: ${response.status}`);

        const data = await response.json();
        console.log("Fetched languages:", data);

        // Extract only the "language" values from the response
        const languageList = data.map((item) => item.language);
        setLanguages(languageList);
      } catch (err) {
        console.error("Error fetching languages:", err);
        setError("Could not load languages. Try again.");
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="container">
      <h2>Languages List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!languages.length ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      )}

      <div className="manage-languages">
        <Link to="/manage-languages">
          <button>Manage Languages</button>
        </Link>
      </div>
    </div>
  );
};

export default LanguagesPage;
