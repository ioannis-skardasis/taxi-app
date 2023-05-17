import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./About.css";

function About() {
  return (
    <MDBContainer className='my-5'>
      <MDBRow>
        <MDBCol
          size='18'
          lg='10'
          className='d-flex flex-column justify-content-center'
        >
          <h3 className='mb-3'><strong>Lost & Found</strong></h3>
          <p className='mb-4'>
            Items left behind in taxi cabs can be a common occurrence for many
            riders. While specific data on lost or forgotten items in taxis may
            be limited, studies on lost and found items in general suggest that
            personal electronics and small items like keys and wallets are among
            the most commonly forgotten items. For example, surveys conducted by
            travel agencies and rideshare services have found that phones,
            chargers, wallets, and keys are often left behind by riders. If you
            find yourself in a rush to leave a taxi, it's always a good idea to
            double-check that you have all of your personal belongings with you
            to avoid the inconvenience of a lost or forgotten item.
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default About;
