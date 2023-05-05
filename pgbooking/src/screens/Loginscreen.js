import React, { useState } from 'react'
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();


    async function Login() {


        const user = {

            email,
            password,

        }

        try {
            setloading(true);
            const result = (await axios.post('api/users/login', user)).data
            setloading(false);

            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home'
        } catch (error) {
            console.log(error)
            setloading(false);
            seterror(true)
        }




    }

    return (
        <div>
            {loading && (<div className="d-flex justify-content-center">
                <Loader />
            </div>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && (<Error message='Invalid Credentioals' />)}

                    <div className='bs'>
                        <h2>Login</h2>

                        <input type="email" className="form-control" placeholder="Email"
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="Password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />


                        <button className='btn btn-primary btn-block mt-3' onClick={Login}>Login</button>
                        <p className="forgot-password text-right">
                           New User? Register <a href="/register">Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )

    
}
export default Loginscreen


// Modal
    // function handleSubmit(e) {
    //     e.preventDefault();

    //     console.log(email, password);
    //     fetch("http://localhost:5000/login-user", {
    //       method: "POST",
    //       crossDomain: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data, "userRegister");
    //         if (data.status == "ok") {
    //           alert("login successful");
    //           window.localStorage.setItem("token", data.data);
    //           window.localStorage.setItem("loggedIn", true);

    //           window.location.href = "./userDetails";
    //         }
    //       });
    //   }

    //   return (
    //     <div className="auth-wrapper">
    //       <div className="auth-inner">
    //         <form onSubmit={handleSubmit}>
    //           <h3>Login</h3>

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
    //             <div className="custom-control custom-checkbox">
    //               <input
    //                 type="checkbox"
    //                 className="custom-control-input"
    //                 id="customCheck1"
    //               />
    //               <label className="custom-control-label" htmlFor="customCheck1">
    //                 Remember me
    //               </label>
    //             </div>
    //           </div>

    //           <div className="d-grid">
    //             <button type="submit" className="btn btn-primary">
    //               Submit
    //             </button>
    //           </div>
    //           <p className="forgot-password text-right">
    //             <a href="/register">register</a>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   );