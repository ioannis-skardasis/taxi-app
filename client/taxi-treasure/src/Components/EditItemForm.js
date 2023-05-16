import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditItemForm({ itemId, onCancel, onItemUpdate }) {
  const [item, setItem] = useState({
    item: "",
    description: "",
    location: "",
    date: "",
    status: "", 
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getItem/${itemId}`)
      .then((response) => {
        const fetchedItem = response.data;
        setItem(fetchedItem);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch item data.");
      });
  }, [itemId]);

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    const token = localStorage.getItem("token");
  
    
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    
    axios
      .put(`http://localhost:8000/updateItem/${itemId}`, item, { headers })
      .then((response) => {
        const updatedItem = response.data;
        onItemUpdate(updatedItem);
        // toast.success("Item updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update item.");
      });
  };
  

  return (
    
    <div className="edit-item-form-container">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            id="item"
            name="item"
            value={item.item}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={item.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={item.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={item.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={item.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select status</option>
            <option value="found">Found</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit">Update Item</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditItemForm;
