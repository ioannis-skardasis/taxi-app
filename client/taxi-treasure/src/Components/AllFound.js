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
import "./AllFound.css";
// import Mailer from "./Mailer";

function AllFound() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  let token = localStorage.getItem("token");

  async function getAllFoundItems() {
    try {
      let response = await axios.get("http://localhost:8000/allItems/found", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Found items: ", response.data);
      if (response.data && response.data.length > 0) {
        const firstItem = response.data[0];
        if (firstItem && firstItem.user && firstItem.user.email) {
          setEmail(firstItem.user.email);
        }
        setFoundItems(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching found items: ", error);
      setLoading(false);
    }
  }

  const navigate = useNavigate();
  const handleContact = (id, email) => {
    navigate("/mailer", { state: { id: id, email: email } });
  };

  useEffect(() => {
    getAllFoundItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='container-found'>
      {loading ? (
        <p>Loading...</p>
      ) : foundItems.length > 0 ? (
        <MDBContainer>
          <h2>Found Items</h2>
          <div className='row-found'>
            {foundItems.map((foundItem) => (
              <div className='col-lg-4 col-md-6 col-sm-12' key={foundItem._id}>
                <MDBCard className='card-found'>
                  <MDBCardBody>
                    <MDBCardTitle>{foundItem.item}</MDBCardTitle>
                    <MDBCardText className='text-center'>
                      {foundItem.description}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Location: {foundItem.location}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Date: {foundItem.date}
                    </MDBCardText>
                    <MDBCardText className='text-center'>
                      Car Brand: {foundItem.carBrand}
                    </MDBCardText>
                    {token && email && (
                      <button
                        onClick={() =>
                          handleContact(foundItem._id, foundItem.user.email)
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
        <p>No found items found</p>
      )}
      {/* {email && <Mailer email={email} />} */}
    </div>
  );
}

export default AllFound;
