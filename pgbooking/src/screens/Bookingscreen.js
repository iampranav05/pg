import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function Bookingscreen({ match }) {
    let location = useLocation();

    const rid = location.pathname.split("/");


    const [loading, setloading] = useState(true);
    // eslint-disable-next-line 
    const [error, seterror] = useState('');
    const [room, setroom] = useState('');

    // useEffect(() => {
    //     if(!localStorage.getItem('currentUser')){
    //         window.location.reload='/login'
    //     }

    // })

    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            alert('Please log in to continue.');
            window.location.href = '/home'; // reload to home page
        }
    }, [])

    useEffect(() => {
        const nbook = async () => {
            try {
                setloading(true)
                const res = (await axios.post('api/rooms/getroombyid', { roomid: rid[2] })).data;
                setroom(res)
                setloading(false);

            } catch (error) {
                setloading(false);
                seterror(true);
            }
        }
        nbook()
    }, []);

    async function bookRoom() {
        const bookingDetails = {

            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id
            // totalamount,  
        }

        try {
            setloading(true);
            // eslint-disable-next-line
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false)
            Swal.fire('Congratulations', 'Your Room Booked Successfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            setloading(false)
            Swal.fire('Ooops', 'Something Went Wrong', 'error')
        }
    }



    return (
        <div className='m-5'>
            {loading ? (<div className="d-flex justify-content-center">
                <Loader />
            </div>) : room ? (<div>
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' alt='img' />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />

                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Rent per Month:{room.rentpermonth}</p>

                            </b>
                        </div>

                        <div style={{ float: 'right' }}>
                            <button className='btn btn-primary' onClick={bookRoom}>Book</button>
                        </div>
                    </div>

                </div>
            </div>) : (<Error />)}
        </div>
    );
}

export default Bookingscreen