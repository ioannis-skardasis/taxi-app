import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function UserItems() {
  console.log("Rendering UserItems component...");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (!token) {
      return;
    }

    axios.get("http://localhost:8000/items/lost", { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setLostItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get("http://localhost:8000/items/found", { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setFoundItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  const handleDeleteLostItem = (itemId) => {
    axios.delete(`http://localhost:8000/items/lost/${itemId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setLostItems(prevItems => prevItems.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleDeleteFoundItem = (itemId) => {
    axios.delete(`http://localhost:8000/items/found/${itemId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setFoundItems(prevItems => prevItems.filter(item => item._id !== itemId));
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (lostItems.length === 0 && foundItems.length === 0) {
    return <p>There are no Lost or Found items in our Database published by you.</p>;
  }

  return (
    <div>
      <h1>{decoded ? decoded.username : null}'s Items</h1>
      {(lostItems.length > 0 || foundItems.length > 0) ? (
        <>
          {lostItems.length > 0 && (
            <>
              <h2>Lost Items</h2>
              <ul>
                {lostItems.map(item => (
                  <li key={item._id}>
                    <div>
                      <h3>{item.item}</h3>
                      <p>Description: {item.description}</p>
                      <p>Location: {item.location}</p>
                      {item.date && <p>Date: {new Date(item.date).toLocaleDateString()}</p>}
                      <button onClick={() => handleDeleteLostItem(item._id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          {foundItems.length > 0 && (
            <>
              <h2>Found Items</h2>
              <ul>
                {foundItems.map(item => (
                  <li key={item._id}>
                    <div>
                      <h3>{item.item}</h3>
                      <p>Description: {item.description}</p>
                      <p>Location: {item.location}</p>
                      {item.date && <p>Date: {new Date(item.date).toLocaleDateString()}</p>}
                      <button onClick={() => handleDeleteFoundItem(item._id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p>There are no Lost or Found items in our Database published by you.</p>
      )}
    </div>
  );
  
}

export default UserItems;

