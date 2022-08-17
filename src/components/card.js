import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CardApp (props) {
    return (
        <Card style={ props.styleCard } className="flex-row">
            {/* { props.charList ? <Card.Img variant="left" src={ props.image } style={ props.styleImg } /> : '' } */}
            <LazyLoadImage alt="" src={ props.image } width={100} height={100} />
            <Card.Body style={ props.styleCardBody } className="p-2 d-flex flex-column justify-content-between">
                <Card.Title>
                    <h5 style={ props.styleTitle }>
                        { props.title }
                    </h5>
                </Card.Title>
                <div className="d-flex justify-content-end">
                    <Button variant="dark" className="btn-sm" onClick={ props.btnClick }>
                        Detail
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardApp;