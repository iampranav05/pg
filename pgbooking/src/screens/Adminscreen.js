import React , {useState , useEffect  } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
// import Error from '../components/Error';
import Swal from 'sweetalert2'

const { TabPane} = Tabs;
function Adminscreen() {

    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href='/home'
        }
    }, [])

  return (
    <div className='mt-3 ml-3 mr-3 bs'>
        <h2 className='text-center' style={{fontSize:'30px'}}><b>ADMIN PANEL</b></h2>
        <Tabs defaultActiveKey='1'>
            <TabPane tab="Bookings" key={"1"}>
               <Bookings/>
            </TabPane>
            <TabPane tab="Rooms" key={"2"}>
                <Rooms/>
            </TabPane>
            <TabPane tab="Add Room" key={"3"}>
                <Addroom />
            </TabPane>
            <TabPane tab="Users" key={"4"}>
                <Users/>
            </TabPane>
        </Tabs>
    </div>
  )
}

export default Adminscreen


export function Bookings(){

    const[bookings , setbookings] = useState([])
    const[loading, setloading] = useState(true)
     // eslint-disable-next-line
    const[error , seterror] = useState()

    useEffect(() => {
     
        const abook = async () => {
            try {
                const data = await (await axios.get("/api/bookings/getallbookings")).data
                setbookings(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        abook()
        
    }, [])

    return(
        <div className='row'>
            <div className='col-md-12'>

                <h1>BOOKINGS</h1>
                {loading && (<Loader/>)}

                <table  className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            {/* <th>Booking Id</th>
                            <th>User Id</th> */}
                            <th>Room</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking=> {
                            return <tr>
                                {/* <td>{booking._id}</td>
                                <td>{booking.userid}</td> */}
                                <td>{booking.room}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>

                

            </div>
        </div>
    )
}

export function Rooms(){

    const[rooms , setrooms] = useState([])
    const[loading, setloading] = useState(true)
     // eslint-disable-next-line
    const[error , seterror] = useState()

    useEffect(() => {
     
        const abook = async () => {
            try {
                const data = await (await axios.get("/api/rooms/getallrooms")).data
                setrooms(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        abook()
        
    }, [])

    // delete option
    const handleDelete = async (id) => {
        try {
          await axios.delete(`/api/rooms/delete/${id}`);
          setrooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The room has been deleted.",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
          });
        }
      };

    // Edit option
    const handleEdit = async (room) => {
        const { value: formValues } = await Swal.fire({
          title: 'Edit Room',
          html:
            `<input id="swal-input1" class="swal2-input" value="${room.name}" placeholder="Name">` +
            `<input id="swal-input2" class="swal2-input" value="${room.type}" placeholder="Type">` +
            `<input id="swal-input3" class="swal2-input" value="${room.rentpermonth}" placeholder="Rent per Month">` +
            `<input id="swal-input4" class="swal2-input" value="${room.maxcount}" placeholder="Max Count">` +
            `<input id="swal-input5" class="swal2-input" value="${room.phonenumber}" placeholder="Phone Number">`,
            
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById('swal-input1').value,
              document.getElementById('swal-input2').value,
              document.getElementById('swal-input3').value,
              document.getElementById('swal-input4').value,
              document.getElementById('swal-input5').value,
            ];
          },
        });
    
        if (formValues) {
          const [name, type, rentpermonth, maxcount, phonenumber] = formValues;
    
          try {
            await axios.put(`/api/rooms/update/${room._id}`, {
              name,
              type,
              rentpermonth,
              maxcount,
              phonenumber,
            });
            setrooms((prevRooms) =>
              prevRooms.map((prevRoom) => {
                if (prevRoom._id === room._id) {
                  return {
                    ...prevRoom,
                    name,
                    type,
                    rentpermonth,
                    maxcount,
                    phonenumber,
                  };
                }
                return prevRoom;
              })
            );
            Swal.fire({
              icon: 'success',
              title: 'Edited!',
              text: 'The room has been edited.',
            });
          } catch (error) {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Please try again later.',
            });
          }
        }
      };

    return(
        <div className='row'>
            <div className='col-md-12'>

                <h1>ROOMS</h1>
                {loading && (<Loader/>)}

                <table  className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            {/* <th>Room Id</th> */}
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per Month</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room=> {
                            return <tr>
                                {/* <td>{room._id}</td> */}
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentpermonth}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                                {/* Edit option */}
                                <td>
                    <button className="btn btn-success" onClick={() => handleEdit(room)}> Edit</button></td>
                                {/* delete option */}
                                <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(room._id)}> Delete</button></td>
                            </tr>
                        }))}
                    </tbody>
                </table>

                

            </div>
        </div>
    )
}

export function Users(){

    const[users , setusers] = useState([])
     // eslint-disable-next-line
    const[loading, setloading] = useState(true)
     // eslint-disable-next-line
    const[error , seterror] = useState('')

    useEffect(() => {
     
        const abook = async () => {
            try {
                const data = await (await axios.get("/api/users/getallusers")).data
                setusers(data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }
        abook()
    },[])

        return(
            <div className='row'>

                <div className='col-md-12'>
                    <h1>Users</h1>
                    <table className='table table-dark table-bordered'>
                        <thead>
                            <tr>
                                {/* <th>User Id</th> */}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is Admin</th>
                            </tr>
                        </thead>

                        <tbody>
                        {users && (users.map(user=> {
                               return <tr>
                                {/* <td>{user._id}</td> */}
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                
                            </tr>
                        }))}

                        </tbody>
                    </table>
                </div>
            </div>
        )
        

}




export  function Addroom() {

    const[loading, setloading] = useState(false)
     // eslint-disable-next-line
    const[error , seterror] = useState('')
    const[name , setname] = useState('')
    const[rentpermonth , setrentpermonth] = useState('')
    const[maxcount , setmaxcount] = useState('')
    const[description , setdescription] = useState('')
    const[phonenumber , setphonenumber] = useState('')
    const[type , settype] = useState('')
    const[imageurl1 , setimageurl] = useState('')
    const[imageurl2 , setimageur2] = useState('')
    const[imageurl3 , setimageur3] = useState('')

    async function addRoom() {
        const newroom = {
            name,
            rentpermonth,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[imageurl1,imageurl2,imageurl3]
        }

        try {
            setloading(true)
            const result = await (await axios.post('/api/rooms/addroom' , newroom)).data
            console.log(result)
            setloading(false)
            Swal.fire('Congrats' , "Your New Room Added Successfully" , 'success').then(result=>{
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Oops' , 'Something Went Wrong' , 'error')
        }

        
    }

  return (
    <div className='row'>
            
        <div className='col-md-5'>
            {loading && <Loader />}
            
            <input type="text" className='form-control' placeholder='Room Name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Rent Per Month' value={rentpermonth} onChange={(e)=>{setrentpermonth(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Max Count' value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Description' value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Phone Number' value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}/>
            

        </div>

        <div className='col-md-5'>

            <input type="text" className='form-control' placeholder='Type' value={type} onChange={(e)=>{settype(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Image Url 1' value={imageurl1} onChange={(e)=>{setimageurl(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Image Url 2' value={imageurl2} onChange={(e)=>{setimageur2(e.target.value)}}/>
            <input type="text" className='form-control' placeholder='Image Url 3' value={imageurl3} onChange={(e)=>{setimageur3(e.target.value)}}/>

            <div className='text-right'>

                <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>

            </div>

        </div>
    </div>
  )
}
