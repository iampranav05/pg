import React , {useState} from 'react'
import { Modal , Button , Carousel} from 'react-bootstrap';
import {Link} from 'react-router-dom'

function Room(props) {
    const {room,key} = props;
    console.log(room)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const url = room.imageurls[0];
    return (
        <div className='row bs' key={key}>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smallimg' alt='img'/>
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <b><p>Max Count : {room.maxcount}</p>
                    <p>Phone Number : {room.phonenumber}</p>
                    <p>Type : {room.type}</p></b>

                <div style={{ float: 'right' }}>
                    <Link to={`/book/${room._id}`}>
                    <button className='btn btn-primary m-2'>Book Now</button>
                    </Link>
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>
            

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel prevLabel='' nextLabel=''>
            {room.imageurls.map(url=> {
                return <Carousel.Item>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt="img"
                />
               
              </Carousel.Item>
            })}
        </Carousel>
        <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
        </div>
    );
}

export default Room