import React from "react";
import { MDBCardBody, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";

import "./Home.css";

function Home() {
  return (
    <div className='homeContainer'>
      <div className='cards-container'>
        <MDBCardBody style={{ display: "flex", flexDirection: "row" }}>
          <div className='card-text'>
            <MDBCardTitle className='text-center mb-4'>
              <h1 id="title" className="display-2">Taxi Treasures</h1>
              <h1 id='moto' className='display-2'>
                Find Your Lost Items with Our App
              </h1>
            </MDBCardTitle>
            <MDBCardText>
              <h3 id='moto' className='text-center'>
                Our app helps you publish and find lost items in taxi cabs.
                Don't lose hope, we are here to help.
              </h3>
            </MDBCardText>
          </div>
        </MDBCardBody>
      </div>
    </div>
  );
}

export default Home;
