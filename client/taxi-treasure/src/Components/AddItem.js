import React, { useState } from "react";
import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import "./AddItem.css";

function AddItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = { name, description, status };
    axios
      .post("http://localhost:8000/addItem", itemData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setName("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div className="formcontainer">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Item</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <MDBInput
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <MDBInput
            type="textarea"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="browser-default custom-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            <option value="found">Found</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <MDBBtn type="submit">Submit</MDBBtn>
      </form>
    </div>
  );
}

export default AddItem;

