import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderTitle from '../components/header';
import AccordionApp from '../components/accordion';

function CharacterByLocation () {
    let [data, setData] = useState(JSON.parse(localStorage.getItem('location')));

    const renderLocation = () => {
        if ( data ) {

            if ( !data.location.length ) return <h4>Location not avaible! Assign location at Page Character Detail</h4>

            return data.location.map((loc, idx) => {
                if ( loc.resident.length ) {
                    return (
                        <Col md="4" key={`col-location-${idx}`} className="mb-2">
                            <AccordionApp title={loc.name} body={loc.resident} />
                        </Col>
                    )
                }
            });

        } else 
            return <h4>Location not avaible! Assign location at Page Character Detail</h4>
    }

    return (
        <Container>
            <HeaderTitle title="Location List" />
            <Row>
                {
                    renderLocation()
                }
            </Row>
        </Container>
    )
}

export default CharacterByLocation;