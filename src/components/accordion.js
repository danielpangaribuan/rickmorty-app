import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import HeaderTitle from './header';

function AccordionApp(props) {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    { props.title }
                </Accordion.Header>
                <Accordion.Body>
                    <HeaderTitle title="Character List" />
                    <ListGroup variant="flush">
                        {
                            props.body.map((val, idx) => {
                                return (
                                    <ListGroup.Item key={"list-char-" + idx}>
                                        { idx + 1 }. { val.name }
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default AccordionApp;