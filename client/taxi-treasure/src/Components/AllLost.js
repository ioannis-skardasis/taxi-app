import { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdb-react-ui-kit";
import axios from "axios";
import "./AllLost.css";

function AllLost() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem("token");

  async function getAllLostItems() {
    try {
      let response = await axios.get("http://localhost:8000/allItems/lost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLostItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching lost items: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllLostItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : lostItems.length > 0 ? (
        <MDBContainer>
          <div className="row">
            {lostItems.map((lostItem) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={lostItem._id}>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle>{lostItem.name}</MDBCardTitle>
                    <MDBCardText>{lostItem.description}</MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </div>
        </MDBContainer>
      ) : (
        <p>No lost items found</p>
      )}
    </div>
  );
}

export default AllLost;