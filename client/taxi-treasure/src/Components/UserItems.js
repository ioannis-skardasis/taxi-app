import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditItemForm from "./EditItemForm"; 
import "./UserItems.css";

function UserItems() {
  console.log("Rendering UserItems component...");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); 
  const token = localStorage.getItem("token");
  const decoded = token ? jwt_decode(token) : null;

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get("https://taxi-treasures.onrender.com/items/lost", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setLostItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://taxi-treasures.onrender.com/items/found", {
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
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  
    if (confirmDelete) {
      axios
        .delete(`https://taxi-treasures.onrender.com/items/lost/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setLostItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
          toast.success("Item deleted successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to delete item.");
        });
    }
  };
  
  const handleDeleteFoundItem = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  
    if (confirmDelete) {
      axios
        .delete(`https://taxi-treasures.onrender.com/items/found/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setFoundItems((prevItems) =>
            prevItems.filter((item) => item._id !== itemId)
          );
          toast.success("Item deleted successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to delete item.");
        });
    }
  };
  

  const handleEditItem = (itemId) => {
    setEditingItemId(itemId); 
  };

  const handleCancelEdit = () => {
    setEditingItemId(null); 
  };

  const handleItemUpdate = (updatedItem) => {
    if (updatedItem.status === "lost") {
      setLostItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    } else if (updatedItem.status === "found") {
      setFoundItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    }
    // setEditingItemId(null); 
    toast.success("Item updated successfully!");
  };
  

  if (lostItems.length === 0 && foundItems.length === 0) {
    return (
      <p>There are no Lost or Found items in our Database published by you.</p>
    );
  }

  return (
    <div className='user-items-container'>
      <ToastContainer />
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
                        className='edit-item-button'
                        onClick={() => handleEditItem(item._id)}
                      >
                        Edit
                      </button>
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
                        className='edit-item-button'
                        onClick={() => handleEditItem(item._id)}
                      >
                        Edit
                      </button>
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
      {editingItemId && (
        <EditItemForm
          itemId={editingItemId}
          onCancel={handleCancelEdit}
          onItemUpdate={handleItemUpdate}
        />
      )}
    </div>
  );
}

export default UserItems;
