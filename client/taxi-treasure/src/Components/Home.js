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
    <div className='homeContainer'>
      <div className='cards-container'>
        <MDBCard className='shadow-2-strong'>
          <MDBCardBody style={{ display: 'flex', flexDirection: 'row' }}>
            <img src={taxilost} alt='Lost and Found 1' className='card-img-left' />
            <div>
              <MDBCardTitle className='text-center mb-4'>
                <h1 id="moto" className='display-2'>Find Your Lost Items with Our App</h1>
              </MDBCardTitle>
              <MDBCardText>
                <h3 id="moto" className='text-center'>
                  Our app helps you publish and find lost items in taxi cabs.
                  Don't lose hope, we are here to help.
                </h3>
              </MDBCardText>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
}

export default Home;

