import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
} from "mdb-react-ui-kit";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import "./AllLost.css";

function AllLost() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let token = localStorage.getItem("token");

  async function getAllLostItems() {
    try {
      let response = await axios.get("https://taxi-treasures.onrender.com/allItems/lost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Lost items: ", response.data);
      setLostItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching lost items: ", error);
      setLoading(false);
    }
  }

  const navigate = useNavigate();
  const handleContact = (id, email) => {
    navigate("/mailer", { state: { id: id, email: email } });
  };

  useEffect(() => {
    getAllLostItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='container-lost'>
      {loading ? (
        <LoadingSpinner />
      ) : lostItems.length > 0 ? (
        <MDBContainer>
          <h2>Lost Items</h2>
          <div className='row-lost'>
            {lostItems.map((lostItem) => (
              <div className='col-lg-4 col-md-6 col-sm-12' key={lostItem._id}>
                <MDBCard className='card-lost'>
                  <MDBCardBody>
                    <MDBCardTitle>{lostItem.item}</MDBCardTitle>
                    <MDBCardText className='text-center'>
                      {lostItem.description}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Location: {lostItem.location}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Date: {lostItem.date}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Car Brand: {lostItem.carBrand}
                    </MDBCardText>
                    {token && lostItem.user && lostItem.user.email && (
                      <button
                        onClick={() =>
                          handleContact(lostItem._id, lostItem.user.email)
                        }
                      >
                        Contact
                      </button>
                    )}
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
