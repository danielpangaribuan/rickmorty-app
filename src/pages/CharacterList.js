import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";
import CardApp from "../components/card";
import Loading from "../components/loading";
import HeaderTitle from "../components/header";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

const LIST_QUERY = gql`
    query Characters($page: Int) {
        characters(page: $page) {
            info {
                pages
                prev
                next
            }
            results {
                id
                name
                image
            }
        }
    }
`;


function CharacterList () {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { data, loading, error, called } = useQuery(
        LIST_QUERY,
        { variables: { page: page } },
        { fetchPolicy: "no-cache" }
    );

    if ( loading && called ) return <Loading />;
    if ( error ) return <pre>{ error.message }</pre>

    const renderChar = () => {
        if ( data.characters.results.length ) {
            return data.characters.results.map( (item, idx) => {
                return (
                    <Col md={4} key={'card-' + idx} className="mb-4">
                        <CardApp charList={true} title={item.name} image={item.image} btnClick={ () => navigate(`characterDetail/${item.id}`) } />
                    </Col>
                )
            })
        }
    }

    const renderPagination = () => {
        if ( data.characters.results.length ) {
            let item = [];
            let startPage = page - 2;
            let endPage = page + 2;
            let totalPage = data.characters.info.pages;

            if ( startPage <= 0 ) {
                endPage -= (startPage - 1);
                startPage = 1;
            }

            if ( endPage > totalPage ) 
                endPage = totalPage;

            if ( startPage > 2 ) {
                item.push(<Pagination.Item key={'pagination-1'} onClick={ () => setPage(1) }>1</Pagination.Item>);
                item.push(<Pagination.Ellipsis />);
            }
            for ( let i = startPage; i <= endPage; i++ ) {
                { 
                    i === page ? 
                    item.push(<Pagination.Item key={'pagination-' + i} onClick={ () => setPage(i) } active >{i}</Pagination.Item>) 
                    :
                    item.push(<Pagination.Item key={'pagination-' + i} onClick={ () => setPage(i) } >{i}</Pagination.Item>) 
                }
                
            }
            if ( endPage < totalPage - 2 ) {
                item.push(<Pagination.Ellipsis key={'pagination-' + totalPage} />);
                item.push(<Pagination.Item onClick={ () => setPage(totalPage) }>{ totalPage }</Pagination.Item>)
            }
            return item;
        }
    }

    return (
        <Container>
            <HeaderTitle title="Character List" />
            <Row>
                {
                    renderChar()
                }

                <Pagination className='justify-content-center'>
                    <Pagination.Prev onClick={ () => setPage(data.characters.info.prev) } />
                    {/* <Pagination.Item active>{ page }</Pagination.Item> */}
                    { renderPagination() }
                    <Pagination.Next onClick={ () => setPage(data.characters.info.next) } />
                </Pagination>
            </Row>
        </Container>
    )
}

export default CharacterList;