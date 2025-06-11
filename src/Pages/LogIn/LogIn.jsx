import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

import logInLottie from '../../assets/lotties/logIn.json';
import Lottie from 'lottie-react';

const LogIn = () => {

      const {logInUser} = use(AuthContext)

      const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    
        // logIn user
        logInUser(email, password)
        .then(result =>{
            console.log(result.user);
        })
        .catch(error=>{
            console.log(error);
        })
       
      };
    return (
       <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "300px" }}
            animationData={logInLottie}
            loop={true}
          ></Lottie>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">LogIn now!</h1>
            <form onSubmit={handleLogIn}>
              <fieldset className="fieldset">
                {/* <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Your name"
                  required
                /> */}

                {/* <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                  required
                /> */}

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">LogIn</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default LogIn;