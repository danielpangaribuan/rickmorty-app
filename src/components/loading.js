import Spinner from 'react-bootstrap/Spinner';

function Loading () {
    return (
        <div className='w-100' style={{ height: '100vh'}}>
            <div className=" h-100 d-flex flex-column justify-content-center align-items-center">
                <Spinner animation="border" className="mb-2" style={{ '--bs-spinner-height': '5rem', '--bs-spinner-width': '5rem' }} />
                <h1>Loading...</h1>
            </div>
        </div>
    )
}

export default Loading;