import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_Base = "http://localhost:5001";

const UsersDetailsPage = () => {
  const { id: userId } = useParams(); // Get userId from the URL params
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [error, setError] = useState(""); // Error state for displaying errors

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`${API_Base}/lab/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
      setUpdatedUser({ name: data.name, age: data.age, country: data.country });
      setError(""); // Clear error state
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Could not load user details. Please try again.");
    }
  };

  const handleUpdateUser = async () => {
    try {
      await fetch(`${API_Base}/lab/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Could not update user details. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>User Details</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!user ? (
        <p>Loading user details...</p>
      ) : isEditing ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
          <label>Age:</label>
          <input
            type="number"
            value={updatedUser.age}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, age: e.target.value })
            }
          />
          <label>Country:</label>
          <input
            type="text"
            value={updatedUser.country}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, country: e.target.value })
            }
          />
          <button onClick={handleUpdateUser}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Country: {user.country}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default UsersDetailsPage;
