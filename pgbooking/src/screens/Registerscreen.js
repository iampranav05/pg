import React, { useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';




function Registerscreen() {
    const navigate = useNavigate();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')


    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();



    async function register() {

        if (password === cpassword) {

            let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
            if (password.match(passwordRegex)) {
                console.log("Password is valid!");
                if (email.includes("@gmail.com")) {
                    const user = {
                        name,
                        email,
                        password,
                        cpassword
                    }

                    try {
                        setloading(true);
                        // eslint-disable-next-line
                        const result = await axios.post('api/users/register', user).data;
                        setloading(false)
                        setsuccess(true)

                        setname('')
                        setemail('')
                        setpassword('')
                        setcpassword('')
                        navigate('/login');
                    } catch (error) {
                        console.log(error);
                        setloading(false);
                        seterror(true)
                    }
                } else {
                    console.log("Email is not valid!");
                    alert("Invalid email address.")
                }

            } else {
                console.log("Password is not valid!");
                alert("Password is not valid!")
            }



        }
        else {
            alert('Password not matched')
        }

    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='Registraion Success' />)}

                    <div className='bs'>
                        <h2>Register</h2>
                        <input type="text" className="form-control" placeholder="Name"
                            value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" className="form-control" placeholder="Email"
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="Password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="Confirm Password"
                            value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <button className='btn btn-primary btn-block mt-3' onClick={register}>Register</button>
                        <p className="forgot-password text-right">
                            Already Registered! Login <a href="/login">Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )


}
export default Registerscreen






 // More opiton
    // const [userType, setUserType] = useState("");
    // const [secretKey, setSecretKey] = useState("");



// More opt
    // const handleSubmit = (e) => {
    //     if (userType === "Admin" && secretKey !== "AdarshT") {
    //       e.preventDefault();
    //       alert("Invalid Admin");
    //     } else {
    //       e.preventDefault();

    //       console.log(name,  email, password , cpassword);
    //       fetch("http://localhost:5000/register", {
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //           name,
    //           email,
    //           password,
    //           userType,
    //         }),
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log(data, "userRegister");
    //           if (data.status === "ok") {
    //             alert("Registration Successful");
    //           } else {
    //             alert("Something went wrong");
    //           }
    //         });
    //     }
    //   };

    // return (
    //     <div className="auth-wrapper">
    //       <div className="auth-inner">
    //         <form onSubmit={handleSubmit}>
    //           <h3>Register</h3>
    //           <div>
    //             Register As
    //             <input
    //               type="radio"
    //               name="UserType"
    //               value="User"
    //               onChange={(e) => setUserType(e.target.value)}
    //             />
    //             User
    //             <input
    //               type="radio"
    //               name="UserType"
    //               value="Admin"
    //               onChange={(e) => setUserType(e.target.value)}
    //             />
    //             Admin
    //           </div>
    //           {userType === "Admin" ? (
    //             <div className="mb-3">
    //               <label>Secret Key</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 placeholder="Secret Key"
    //                 onChange={(e) => setSecretKey(e.target.value)}
    //               />
    //             </div>
    //           ) : null}

    //           <div className="mb-3">
    //             <label>Name</label>
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="First name"
    //               onChange={(e) => setname(e.target.value)}
    //             />
    //           </div>



    //           <div className="mb-3">
    //             <label>Email address</label>
    //             <input
    //               type="email"
    //               className="form-control"
    //               placeholder="Enter email"
    //               onChange={(e) => setemail(e.target.value)}
    //             />
    //           </div>

    //           <div className="mb-3">
    //             <label>Password</label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               placeholder="Enter password"
    //               onChange={(e) => setpassword(e.target.value)}
    //             />
    //           </div>

    //           <div className="mb-3">
    //             <label>Confirm Password</label>
    //             <input
    //               type="password"
    //               className="form-control"
    //               placeholder="Enter password"
    //               onChange={(e) => setcpassword(e.target.value)}
    //             />
    //           </div>

    //           <div className="d-grid">
    //             <button type="submit" className="btn btn-primary">
    //               Sign Up
    //             </button>
    //           </div>
    //           <p className="forgot-password text-right">
    //             Already registered <a href="/login">login</a>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   );