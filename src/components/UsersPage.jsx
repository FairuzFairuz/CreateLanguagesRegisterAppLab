import React, { useState, useEffect } from "react";

const API_Base = import.meta.env.VITE_SERVER;

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_Base}/lab/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${API_Base}/lab/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
