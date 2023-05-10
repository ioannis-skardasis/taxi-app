import { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdb-react-ui-kit";
import axios from "axios";
import "./AllFound.css";

function AllFound() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem("token");

  async function getAllFoundItems() {
    try {
      let response = await axios.get("http://localhost:8000/allItems/found", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoundItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching found items: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllFoundItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : foundItems.length > 0 ? (
        <MDBContainer>
          <div className="row">
            {foundItems.map((foundItem) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={foundItem._id}>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{foundItem.item}</MDBCardTitle>
                    <MDBCardText>{foundItem.description}</MDBCardText>
                    <MDBCardText>Location: {foundItem.location}</MDBCardText>
                    <MDBCardText>Date: {foundItem.date}</MDBCardText>
                    <MDBCardText>Car Brand: {foundItem.carBrand}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </div>
        </MDBContainer>
      ) : (
        <p>No found items found</p>
      )}
    </div>
  );
}

export default AllFound;

