import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./UserItems.css";

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

    axios
      .get("http://localhost:8000/items/lost", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setLostItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8000/items/found", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFoundItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleDeleteLostItem = (itemId) => {
    axios
      .delete(`http://localhost:8000/items/lost/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setLostItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteFoundItem = (itemId) => {
    axios
      .delete(`http://localhost:8000/items/found/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setFoundItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (lostItems.length === 0 && foundItems.length === 0) {
    return (
      <p>There are no Lost or Found items in our Database published by you.</p>
    );
  }

  return (
    <div className='user-items-container'>
      <h1>{decoded ? decoded.username : null}'s Items</h1>
      {lostItems.length > 0 || foundItems.length > 0 ? (
        <div className='items-list-container'>
          {lostItems.length > 0 && (
            <div className='lost-items-container'>
              <h2 className='lost-items-title'>Lost Items</h2>
              <ul className='lost-items-list'>
                {lostItems.map((item) => (
                  <li className='lost-item' key={item._id}>
                    <div className='item-details-container'>
                      <h3 className='item-name'>{item.item}</h3>
                      <p className='item-description'>
                        Description: {item.description}
                      </p>
                      <p className='item-location'>Location: {item.location}</p>
                      {item.date && (
                        <p className='item-date'>
                          Date: {new Date(item.date).toLocaleDateString()}
                        </p>
                      )}
                      <button
                        className='delete-item-button'
                        onClick={() => handleDeleteLostItem(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {foundItems.length > 0 && (
            <div className='found-items-container'>
              <h2 className='found-items-title'>Found Items</h2>
              <ul className='found-items-list'>
                {foundItems.map((item) => (
                  <li className='found-item' key={item._id}>
                    <div className='item-details-container'>
                      <h3 className='item-name'>{item.item}</h3>
                      <p className='item-description'>
                        Description: {item.description}
                      </p>
                      <p className='item-location'>Location: {item.location}</p>
                      {item.date && (
                        <p className='item-date'>
                          Date: {new Date(item.date).toLocaleDateString()}
                        </p>
                      )}
                      <button
                        className='delete-item-button'
                        onClick={() => handleDeleteFoundItem(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>
          There are no Lost or Found items in our Database published by you.
        </p>
      )}
    </div>
  );
}

export default UserItems;
