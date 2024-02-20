import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'reactstrap';

const Hero: React.FC = () => {
    return (
        <section className="section position-relative">
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="pr-lg-5">
                  <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">Chatting with Documents</p>
                  <h1 className="mb-4 font-weight-normal line-height-1_4">Retrival Augmented Generation</h1>
                  <p className="text-muted mb-4 pb-2">Chatbot using a vectorized database</p>
                  <Link href="/login">Sign in</Link>

                </div>
              </Col>
              <Col lg={6}>
                <div className="mt-5 mt-lg-0">
                    <h1 className="mb-4 font-weight-normal line-height-1_4">Group Members</h1>
                  <img src="/images/Group Members.png" alt="" className="img-fluid mx-auto d-block"/>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      );
    }
    
    export default Hero;