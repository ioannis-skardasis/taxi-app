import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import taxiSign1 from "./icons/taxiSign1.png";
import movingTaxi from "./icons/movingTaxi.png";
import "./About.css";

function About() {
  return (
    <MDBContainer className="my-5">
      <MDBRow>
        <MDBCol size="12" lg="6">
          <div className="d-flex align-items-center justify-content-center">
            <img src={taxiSign1} alt='Taxi' className='taxiSign1 img-fluid mr-3' />
            
          </div>
        </MDBCol>
        <MDBCol size="12" lg="6" className="d-flex flex-column justify-content-center">
          <h3 className="mb-4">Lost & Found</h3>
          <p className="mb-4">
            Items left behind in taxi cabs can be a common occurrence for many
            riders. While specific data on lost or forgotten items in taxis may be
            limited, studies on lost and found items in general suggest that
            personal electronics and small items like keys and wallets are among the
            most commonly forgotten items. For example, surveys conducted by travel
            agencies and rideshare services have found that phones, chargers,
            wallets, and keys are often left behind by riders. If you find yourself
            in a rush to leave a taxi, it's always a good idea to double-check that
            you have all of your personal belongings with you to avoid the
            inconvenience of a lost or forgotten item.
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <MDBIcon icon="car" size="3x" className="text-primary me-3" />
            <img src={movingTaxi} alt='Taxi' className='movingTaxi img-fluid' />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default About;

