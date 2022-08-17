import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation, InMemoryCache } from '@apollo/client';
import Loading from '../components/loading';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HeaderTitle from "../components/header";

function CharacterDetail () {
    let { id } = useParams();
    let [obj, setObj] = useState(JSON.parse(localStorage.getItem('location')));
    let [loc, setLoc] = useState('');

    useEffect(() => {
        console.log(obj)
        if ( obj.location ) {
            let locationDefault = obj.location.filter(el => {
                let _foundIdx = el.resident.findIndex( val => val.id == id );
                if ( _foundIdx >= 0 ) return el.name;
            });

            if ( locationDefault.length ) setLoc(locationDefault[0].name);
        }
    }, [])
    console.log(obj)
    const DETAIL_QUERY_ID = gql`
        query GetCharactersByIds {
            charactersByIds(ids: [${id}]) {
                id
                name
                image
                status
                gender
                species
            }
        }
    `;
    const { data, loading, error, called } = useQuery(
        DETAIL_QUERY_ID,
        { fetchPolicy: 'no-cache' }
    );
    const submitLocation = () => {
        let input = document.querySelector('input[name=location]');
        let value = input.value;
        if ( obj ) {
            let isLocationExist = obj.location.findIndex( el => el.name.toLowerCase() == value.toLowerCase() );
            setObj(obj.location.filter((el, idx) => {
                let _removeNameExist = el.resident.filter( item => item.id !== id );
                el.resident = _removeNameExist;
                return el;
            }));
            if ( isLocationExist >= 0 ) {
                let newObj = obj;
                newObj.location[isLocationExist].resident.push({
                    id: id,
                    name: data.charactersByIds[0].name
                })
                setObj(newObj);
            } else {
                setObj(obj.location.push({
                    id: obj.location.length + 1,
                    name: input.value,
                    resident: [
                        {
                            id: id,
                            name: data.charactersByIds[0].name
                        }
                    ]
                }));
            }

        } else {
            setObj({
                location: [
                    {
                        id: obj.location.length + 1,
                        name: input.value,
                        resident: [
                            {
                                id: id,
                                name: data.charactersByIds[0].name
                            }
                        ]
                    }
                ]
            });
        };
        setLoc(value);
        localStorage.setItem('location', JSON.stringify(obj));
    }

    if ( loading ) return <Loading />
    if ( error ) return <pre>{ error.message }</pre>

    return (
        <Container>
            <HeaderTitle title="Character Detail" />
            <Row>
                <Col md={4}>
                    <div className="image-profile mb-2">
                        <img src={ data.charactersByIds[0].image } style={{ width: '100%' }} />
                    </div>
                </Col>
                <Col md={8}>
                    <div className="detail-profile">
                        <h2 className='mb-4 font-weight-bold'>
                            { data.charactersByIds[0].name.toUpperCase() }
                        </h2>
                        <div className="d-flex flex-column">
                            <span className="py-1 px-4 mb-1" style={{ background: '#000', color: '#FFF', display: 'inline-block', width: '200px', borderRadius: '8px', boxShadow: '0px 1px 6px 1px rgba(0,0,0,.5)'}}>
                                Species:&nbsp;
                                {data.charactersByIds[0].species}
                            </span>
                            <span className="py-1 px-4 mb-1" style={{ background: '#000', color: '#FFF', display: 'inline-block', width: '200px', borderRadius: '8px', boxShadow: '0px 1px 6px 1px rgba(0,0,0,.5)'}}>
                                Status:&nbsp;
                                {data.charactersByIds[0].status}
                            </span>
                            <span className="py-1 px-4 mb-1" style={{ background: '#000', color: '#FFF', display: 'inline-block', width: '200px', borderRadius: '8px', boxShadow: '0px 1px 6px 1px rgba(0,0,0,.5)'}}>
                                Gender:&nbsp;
                                {data.charactersByIds[0].gender}
                            </span>
                        </div>
                        <Form>
                            <Form.Group>
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Input Location" name="location" defaultValue={loc} />
                            </Form.Group>
                            <Button variant="dark" className="btn-sm mt-2 d-flex justify-content-end" onClick={ () => submitLocation() }>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CharacterDetail;