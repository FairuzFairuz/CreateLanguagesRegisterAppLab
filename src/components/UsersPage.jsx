import React, { useState, useEffect, use } from "react";

const API_Base = "http://localhost:5001";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", country: "" });
  const [updatedFields, setUpdatedFields] = useState({});
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_Base}/lab/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUserWithID = { ...newUser, id };
    try {
      const res = await fetch(`${API_Base}/lab/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserWithID),
      });
      if (!res.ok) throw new Error("Failed to add user");
      const addedUser = await res.json();
      setUsers((prev) => [...prev, addedUser]);
      setNewUser({ name: "", age: "", country: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error adding user", error);
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`${API_Base}/lab/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePatchUser = async (id) => {
    if (id === null) return; // Ensure a user ID is selected for update
    try {
      const res = await fetch(`${API_Base}/lab/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields), // Send only updated fields
      });

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updateID ? { ...user, ...updatedFields } : user
        )
      ); // Update state with patched user
      setUpdatedFields({}); // Reset updated fields
      setUpdateID(null); // Reset update ID
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <h2>Users</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newUser.country}
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {updateID !== null && (
        <div>
          <input
            type="text"
            placeholder="Updated Name"
            value={updatedFields.name || ""}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Updated Age"
            value={updatedFields.age || ""}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, age: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Updated Country"
            value={updatedFields.country || ""}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, country: e.target.value })
            }
          />
          <button onClick={handlePatchUser}>Update User</button>
        </div>
      )}

      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.age} - {user.country}
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              <button
                onClick={() => {
                  setUpdateID(user.id);
                  setUpdatedFields({
                    name: user.name,
                    age: user.age,
                    country: user.country,
                  });
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
