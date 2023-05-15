import React, { useState } from "react";
import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddItem.css";

function AddItem() {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = { item, description, location, date, carBrand, status };
    axios
      .post("http://localhost:8000/addItem", itemData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setItem("");
        setDescription("");
        setLocation("");
        setDate("");
        setCarBrand("");
        setStatus("");
        toast.success("Item added successfully!"); 
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error("Failed to add item."); 
      });
  }
  

  return (
    <div className="formcontainer">
       <ToastContainer />
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Item</h1>
        <div className="form-group">
          <label htmlFor="item">Item</label>
          <MDBInput
            type="text"
            id="name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
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
          <label htmlFor="location">Location</label>
          <MDBInput
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <MDBInput
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="carBrand">Car Brand</label>
          <select
            id="carBrand"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
          >
            <option value="">-- Select Car Brand --</option>
            <option value="Opel">Opel</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Skoda">Skoda</option>
            <option value="Ford">Ford</option>
            <option value="Toyota">Toyota</option>
            <option value="Nissan">Nissan</option>
            <option value="SEAT">SEAT</option>
            <option value="BMW">BMW</option>
            <option value="Fiat">Fiat</option>
            <option value="Other">Other</option>
          </select>
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

