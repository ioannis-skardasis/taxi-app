import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import taxilost from "./icons/taxilost.png";
import "./Home.css";

function Home() {
  return (
    <div className='home-container'>
      <div className='cards-container'>
        <MDBCard className='shadow-2-strong'>
          <img src={taxilost} alt='Lost and Found 1' className='card-img-top' />
          <MDBCardBody>
            <MDBCardTitle className='text-center mb-4'>
              <h1 className='display-2'>Find Your Lost Items with Our App</h1>
            </MDBCardTitle>
            <MDBCardText>
              <h3 className='text-center'>
                Our app helps you publish and find lost items in taxi cabs.
                Don't lose hope, we are here to help.
              </h3>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
}

export default Home;
