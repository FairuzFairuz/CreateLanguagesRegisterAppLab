import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_Base = "http://localhost:5001";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_Base}/lab/users`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Could not load users. Try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Users List</h2>
      <div className="manage-users">
        <Link to="/manage-users">
          <button>Manage Users</button>
        </Link>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!users.length ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Name:{user.name} <br />
              Age: {user.age}
              <br />
              Country: {user.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
